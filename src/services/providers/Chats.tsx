import { Address, Contract, DecodedEventWithTransaction, Subscriber } from "everscale-inpage-provider";
import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { useUserSocket } from "src/hooks/useUserSocket";
import { useVenomProvider } from "src/hooks/useVenomProvider";
import { useVenomWallet } from "src/hooks/useVenomWallet";
import { abi as UserAbi } from "contracts/abi/User.abi";
import { abi as FactoryAbi } from "contracts/abi/Factory.abi";
import { abi as ChatAbi } from "contracts/abi/Chat.abi";
import { accountAddress } from "src/utils/constants";
import { useForceRender } from "src/hooks/useForceRender";
import moment from "moment";
import { useStandaloneCryption } from "src/hooks/useStandaloneCryption";
import { useSockets } from "src/hooks/useSockets";

interface ChatParticipant {
  address: Address;
  alias?: string;
}

interface Message {
  uuid?: string;
  sender: Address;
  recipient: Address;
  timestamp: number;
  text: string;
  hash: string;
  pending?: boolean;
}

export interface Chat {
  user: Contract<typeof UserAbi>;
  contract?: Contract<typeof ChatAbi>;
  subscriber?: Subscriber;
  lastMessageText?: string;
  lastMessageTimestamp?: number;
  messages: Message[];
}

interface ChatsContextProps {
  chats: Chat[];
  createChat: Function;
  sendMessage: Function;
  resetState: Function;
}

const defaultContext: ChatsContextProps = {
  chats: [],
  createChat: new Function(),
  sendMessage: new Function(),
  resetState: new Function(),
};

export const ChatsContext = createContext<ChatsContextProps>(defaultContext);

export const ChatsProvider: FC<PropsWithChildren> = ({ children }) => {
  const provider = useVenomProvider();
  const wallet = useVenomWallet();
  const userSocket = useUserSocket();
  const { getSocket } = useSockets();
  const [chats, setChats] = useState<Chat[]>([]);
  const [chatsSubscriber, setChatsSubscriber] = useState<
    Subscriber | undefined
  >();
  const [initialized, setInitialized] = useState(false);
  const forceUpdate = useForceRender();
  const { encrypt, decrypt, keys } = useStandaloneCryption();

  const resetState = () => {
    setChats([]);
    setInitialized(false);
    setChatsSubscriber(undefined);
  };

  useEffect(() => {
    if (userSocket && !initialized && keys?.privateKey) {
      getChats();
    }
  }, [userSocket, keys]);

  const getChats = async () => {
    if (!provider || !wallet.address) return;

    setInitialized(true);

    const contract = new provider.Contract(FactoryAbi, accountAddress);
    const chats = await contract.methods
      .getChats({ peer: wallet.address })
      .call();

    if (!chatsSubscriber) {
      const subscriber = new Subscriber(provider);
      contract
        .events(subscriber)
        .filter(({ event }) => event === "NewChat")
        // @ts-ignore
        .on(onNewChat);
      setChatsSubscriber(subscriber);
    }

    chats.value0.forEach(async ([userAddress, chatAddress]) => {
      const socket = await getSocket(userAddress);
      const user = new provider.Contract(UserAbi, socket);
      const publicKeyResponse = await user.methods.getPublicKey({}).call();
      const publicKey = publicKeyResponse.value0;
      const contract = new provider.Contract(ChatAbi, chatAddress);
      const response = await contract.getPastEvents({});
      const subscriber = new Subscriber(provider);
      contract
        .events(subscriber)
        .filter(({ event }) => event === "NewMessage")
        // @ts-ignore
        .on(onNewMessage);
      const events = response?.events;
      const messages = events.map(({ data, transaction }) => {
        const message = decrypt(data.encryptedMessage, publicKey);

        return {
          sender: data.sender,
          recipient: data.recipient,
          timestamp: transaction.createdAt,
          text: message,
          hash: data.encryptedMessage,
        };
      });
      const { text, timestamp } = messages?.[0] || {};

      addChat(user, contract, subscriber, text, timestamp, messages);
    });
  };

  const createChat = async (
    address: string,
    socket: string,
    message: string
  ) => {
    if (!provider || !address || !wallet.address) return;
    const factory = new provider.Contract(FactoryAbi, accountAddress);
    const user = new provider.Contract(UserAbi, new Address(socket));
    const publicKey = await user.fields._publicKey();
    const encryptedMessage = encrypt(message, publicKey);
    await factory.methods
      .deployChat({
        peer1: wallet.address,
        peer2: new Address(address),
        initialEncryptedMessage: encryptedMessage,
        initialMessageNonce: "",
        sendRemainingGasTo: wallet.address,
      })
      .sendDelayed({
        from: wallet.address,
        amount: "3000000000",
        bounce: true,
      });

    const newChat = {
      user,
      lastMessageText: message,
      lastMessageTimestamp: moment().unix(),
      messages: [
        {
          text: message,
          pending: true,
          sender: wallet?.address ? wallet.address : new Address(""),
          recipient: new Address(socket),
          timestamp: moment().unix(),
          hash: encryptedMessage,
        },
      ],
    };

    setChats((list) => [...list, newChat]);

    return newChat;
  };

  const sendMessage = async (message: string, chat: Chat) => {
    if (!provider || !wallet.address) return;

    const publicKey = await chat.user.fields._publicKey();
    const encryptedMessage = encrypt(message, publicKey);

    await chat?.contract?.methods
      .sendMessage({
        sender: wallet.address,
        recipient: chat.user.address,
        encryptedMessage,
        nonce: "",
      })
      .sendDelayed({
        from: wallet?.address,
        amount: "50000000",
        bounce: true,
      });

    // @ts-ignore
    chat.messages.push({
      text: message,
      pending: true,
      sender: wallet.address,
      recipient: new Address(chat.user.address.toString()),
      timestamp: moment().unix(),
      hash: encryptedMessage,
    });
  };

  const getChatByUser = (address: Address): Chat | undefined => {
    let chat;

    setChats((chats) => {
      chat = chats.find(({ user }) => {
        return user?.address?.toString() === address.toString();
      });

      return chats;
    });

    return chat;
  };

  const getChatByAddress = (address: Address) => {
    let chat;

    setChats((chats) => {
      chat = chats.find(({ contract }) => {
        return contract?.address.toString() === address.toString();
      });

      return chats;
    });

    return chat;
  };

  const onNewMessage = async (
    event: DecodedEventWithTransaction<typeof ChatAbi, "NewMessage">
  ) => {
    // @ts-ignore
    const chat: Chat = getChatByAddress(event.transaction.inMessage.dst);
    // @ts-ignore
    const existingMessage = chat.messages.find(
      ({ hash }: any) => hash === event.data.encryptedMessage
    );
    const publicKey = await chat.user.fields._publicKey();
    const text = decrypt(event.data.encryptedMessage, publicKey);
    if (existingMessage) {
      existingMessage.pending = false;
    } else {
      chat.messages.push({
        text,
        // @ts-ignore
        sender: event?.data?.fromAddress,
        // @ts-ignore
        recipient: event?.data?.toAddress,
        timestamp: event.transaction.createdAt,
        hash: event.data.encryptedMessage,
      });
    }
    chat.lastMessageText = text;
    chat.lastMessageTimestamp = event.transaction.createdAt;
    forceUpdate();
  };

  const onNewChat = async (
    event: DecodedEventWithTransaction<typeof FactoryAbi, "NewChat">
  ) => {
    if (!wallet?.address || !provider) return;
    if (
      event.data.peer2.toString() !== wallet.address.toString() &&
      event.data.peer1.toString() !== wallet.address.toString()
    )
      return;

    const socket = await getSocket(event.data.peer2.toString());
    const chat: Chat | undefined = getChatByUser(new Address(socket));

    if (chat) {
      const subscriber = new Subscriber(provider);
      const contract = new provider.Contract(
        ChatAbi,
        new Address(event.data.newChatAddress.toString())
      );
      contract
        .events(subscriber)
        .filter(({ event }) => event === "NewMessage")
        // @ts-ignore
        .on(onNewMessage);
      const response = await contract.getPastEvents({});
      const user = new provider.Contract(UserAbi, new Address(socket));
      const publicKeyResponse = await chat?.user?.methods.getPublicKey({}).call();
      const publicKey = publicKeyResponse.value0;
      const events = response?.events;
      const messages = events.map(({ data, transaction }) => {
        const message = decrypt(data.encryptedMessage, publicKey);

        return {
          sender: data.sender,
          recipient: data.recipient,
          timestamp: transaction.createdAt,
          text: message,
          hash: data.encryptedMessage,
        };
      });

      chat.subscriber = subscriber;
      chat.contract = contract;
      chat.messages = messages;
    } else {
      const socket = await getSocket(event.data.peer1.toString());
      const user = new provider.Contract(UserAbi, new Address(socket));
      const subscriber = new Subscriber(provider);
      const contract = new provider.Contract(
        ChatAbi,
        new Address(event.data.newChatAddress.toString())
      );
      contract
        .events(subscriber)
        .filter(({ event }) => event === "NewMessage")
        // @ts-ignore
        .on(onNewMessage);

      const newChat = {
        user,
        contract,
        subscriber,
        lastMessageText: "",
        lastMessageTimestamp: moment().unix(),
        messages: [],
      };

      setChats((list) => [...list, newChat]);
    }

    forceUpdate();
  };

  const addChat = (
    user: Contract<typeof UserAbi>,
    contract: Contract<typeof ChatAbi>,
    subscriber: Subscriber,
    lastMessageText: string,
    lastMessageTimestamp: number,
    messages: Message[] = []
  ) => {
    setChats((current) => [
      ...current,
      {
        user,
        contract,
        subscriber,
        lastMessageText,
        lastMessageTimestamp,
        messages,
      },
    ]);
  };

  return (
    <ChatsContext.Provider
      value={{ chats, createChat, sendMessage, resetState }}
    >
      {children}
    </ChatsContext.Provider>
  );
};
