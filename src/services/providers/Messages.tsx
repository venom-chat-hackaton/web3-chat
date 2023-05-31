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
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    subscribe();
  }, [provider]);

  const subscribe = async () => {
    const socket = localStorage.getItem("SOCKET_ADDRESS");
    if (!provider || !socket) return;

    const address = new Address(socket);
    const contract = new provider.Contract(SocketAbi, address);
    const subscriber = new Subscriber(provider);

    contract
      .events(subscriber)
      .filter((event) => event.event === "NewMessage")
      .on(addMessage);
  };

  const addMessage = async (
    event: DecodedEventWithTransaction<typeof SocketAbi, "NewMessage">
  ) => {
    const message = event?.data.msg.toString();
    setMessages((value) => [
      ...value,
      {
        text: message,
        timestamp: moment.now(),
        sender: wallet.address?.toString(),
      },
    ]);
  };

  const sendMessage = async (text: string) => {
    const socket = localStorage.getItem("SOCKET_ADDRESS");
    if (!provider || !socket || !wallet.address) return;

    const address = new Address(socket);
    const contract = new provider.Contract(SocketAbi, address);

    await contract.methods.sendMessage({ message: text }).send({
      from: wallet?.address,
      amount: "500000000",
      bounce: true,
    });
  };

  return (
    <MessagesContext.Provider value={{ sendMessage, messages }}>
      {children}
    </MessagesContext.Provider>
  );
};
