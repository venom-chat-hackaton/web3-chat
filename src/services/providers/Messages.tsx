import { abi as SocketAbi } from "contracts/abi/Socket.abi";
import {
  Address,
  DecodedEventWithTransaction,
  Subscriber,
} from "everscale-inpage-provider";
import moment from "moment";
import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "src/hooks/useAuth";
import { useChats } from "src/hooks/useChats";
import { useSockets } from "src/hooks/useSockets";
import { useUserSocket } from "src/hooks/useUserSocket";
import { useVenomProvider } from "src/hooks/useVenomProvider";
import { useVenomWallet } from "src/hooks/useVenomWallet";

interface MessagesContextProps {
  messages: any[];
  sendMessage: Function;
}

const defaultContext: MessagesContextProps = {
  messages: [],
  sendMessage: new Function(),
};

export const MessagesContext =
  createContext<MessagesContextProps>(defaultContext);

export const MessagesProvider: FC<PropsWithChildren> = ({ children }) => {
  const provider = useVenomProvider();
  const wallet = useVenomWallet();
  const { getSocket } = useSockets();
  const { chats, createChat } = useChats();
  const userSocket = useUserSocket();
  const [messages, setMessages] = useState<any[]>([]);

  const getMessages = () => {
    if (!provider || messages.length) return;
    // @ts-ignore
    const sockets: string[] = [
      // @ts-ignore
      userSocket?.address.toString(),
      // @ts-ignore
      ...chats.map(({ socket }) => socket),
    ];
    const msgs = [];
    const filteredSockets = [...new Set(sockets)];
    filteredSockets.forEach(async (sckt) => {
      const contract = new provider.Contract(SocketAbi, new Address(sckt));
      const events = await contract?.getPastEvents({});
      events.events.forEach((ev) => {
        addMessage({
          message: ev.data.msg,
          timestamp: ev.transaction.createdAt,
          sender: ev.data.fromAddress,
          recipient: ev.data.toAddress,
          messageHash: ev.transaction.inMessage.hash,
        });
      });
    });
  };

  useEffect(() => {
    if (!provider || !wallet || !chats?.length) return;
    subscribeOnMessages();
  }, [chats, provider, wallet]);

  useEffect(() => {
    if (!provider || !wallet || !chats?.length) return;
    getMessages();
  }, [chats, provider, wallet]);

  const subscribeOnMessages = async () => {
    chats.forEach(async (chat) => {
      if (chat.subscriber) return;

      // @ts-ignore
      const subscriber = await subscribe(chat.address.toString());
      chat.subscriber = subscriber;
    });
  };

  const subscribe = async (address: string) => {
    const socket = await getSocket(address);
    if (!provider || !socket) return;

    const addr = new Address(socket);
    const contract = new provider.Contract(SocketAbi, addr);
    const subscriber = new Subscriber(provider);

    contract
      .events(subscriber)
      .filter((event) => event.event === "NewMessage")
      .on((event) => onNewMessage(event));

    return subscriber;
  };

  const onNewMessage = (
    event: DecodedEventWithTransaction<typeof SocketAbi, "NewMessage">
  ) => {
    const messageHash = event.transaction.inMessage.hash;
    const message = event?.data.msg;
    const sender = event?.data.fromAddress;
    const recipient = event?.data.toAddress;

    addMessage({
      message,
      sender,
      recipient,
      messageHash,
      timestamp: event.transaction.createdAt,
    });
  };

  const addMessage = async ({
    message,
    sender,
    recipient,
    messageHash,
    isPending,
    timestamp,
  }: any) => {
    const existingMessage = messages.find(
      ({ messageHash: mHash }: any) => mHash === messageHash
    );

    if (existingMessage) {
      existingMessage.isPending = false;
    } else {
      setMessages((value) => [
        ...value,
        {
          text: message,
          timestamp,
          sender,
          recipient,
          messageHash,
          isPending,
        },
      ]);
    }
  };

  const sendMessage = async (
    message: string,
    dest: string,
    initial = false
  ) => {
    const socket = await getSocket(dest);
    if (!provider || !socket || !wallet.address) return;

    if (initial) {
      createChat(dest);
    }
    const address = new Address(socket);
    const contract = new provider.Contract(SocketAbi, address);

    const { messageHash } = await contract.methods
      .sendMessage({ message, from: wallet.address.toString(), dest })
      .sendDelayed({
        from: wallet?.address,
        amount: "50000000",
        bounce: true,
      });

    addMessage({
      message,
      sender: wallet.address.toString(),
      recipient: dest,
      messageHash,
      isPending: true,
      timestamp: moment().unix(),
    });
  };

  return (
    <MessagesContext.Provider value={{ sendMessage, messages }}>
      {children}
    </MessagesContext.Provider>
  );
};
