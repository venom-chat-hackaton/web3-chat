import { Address, Contract, Subscriber } from "everscale-inpage-provider";
import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useUserSocket } from "src/hooks/useUserSocket";
import { useVenomProvider } from "src/hooks/useVenomProvider";
import { useVenomWallet } from "src/hooks/useVenomWallet";
import { abi as UserAbi } from "contracts/abi/User.abi";
import { useSockets } from "src/hooks/useSockets";
import { abi as FactoryAbi } from "contracts/abi/Factory.abi";
import { abi as ChatAbi } from "contracts/abi/Chat.abi";
import { accountAddress } from "src/utils/constants";
import { v4 as uuid } from "uuid";
import { DecodedEventWithTransaction } from "locklift";
import { useForceRender } from "src/hooks/useForceRender";
import moment from "moment";

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
  pending?: boolean;
}

export interface Chat {
  user: Contract<typeof UserAbi>;
  contract: Contract<typeof ChatAbi>;
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
  const [chats, setChats] = useState<Chat[]>([]);
  const [chatsSubscriber, setChatsSubscriber] = useState<
    Subscriber | undefined
  >();
  const [initialized, setInitialized] = useState(false);
  const forceUpdate = useForceRender();

  const resetState = () => {
    setChats([]);
    setInitialized(false);
    setChatsSubscriber(undefined);
  }

  useEffect(() => {
    if (userSocket && !initialized) {
      getChats();
    }
  }, [userSocket]);

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
      const user = new provider.Contract(UserAbi, userAddress);
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
        return {
          sender: data.fromAddress,
          recipient: data.toAddress,
          timestamp: transaction.createdAt,
          text: data.msg,
        };
      });
      const { text, timestamp } = messages?.[0] || {};

      addChat(user, contract, subscriber, text, timestamp, messages);
    });
  };

  const createChat = async (address: string, message: string) => {
    if (!provider || !address || !wallet.address) return;
    const factory = new provider.Contract(FactoryAbi, accountAddress);
    await factory.methods
      .deployChat({
        peer1: wallet.address,
        peer2: new Address(address),
        initialMessage: message,
        messageUuid: uuid(),
        sendRemainingGasTo: wallet.address,
      })
      .sendWithResult({
        from: wallet.address,
        amount: "3000000000",
        bounce: true,
      });
  };

  const sendMessage = async (message: string, chat: Chat) => {
    if (!provider || !wallet.address) return;
    const stringUuid = uuid();

    await chat.contract.methods
      .sendMessage({
        message,
        from: wallet.address,
        dest: chat.user.address,
        uuid: stringUuid,
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
      recipient: chat.user.address,
      timestamp: moment().unix(),
      uuid: stringUuid,
    });

    forceUpdate();
  };

  const getChatByAddress = (address: Address) => {
    let chat;

    setChats((chats) => {
      chat = chats.find(({ contract }) => {
        return contract.address.toString() === address.toString();
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
      ({ uuid }: any) => uuid === event.data.uuid
    );
    if (existingMessage) {
      existingMessage.pending = false;
    } else {
      chat.messages.push({
        text: event?.data?.msg,
        // @ts-ignore
        sender: event?.data?.fromAddress,
        // @ts-ignore
        recipient: event?.data?.toAddress,
        timestamp: event.transaction.createdAt,
      });
    }
    chat.lastMessageText = event?.data?.msg;
    chat.lastMessageTimestamp = event.transaction.createdAt;
    forceUpdate();
  };

  const onNewChat = async (
    event: DecodedEventWithTransaction<typeof FactoryAbi, "NewChat">
  ) => {
    console.log("onNewChat", event);
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
    <ChatsContext.Provider value={{ chats, createChat, sendMessage, resetState }}>
      {children}
    </ChatsContext.Provider>
  );
};
