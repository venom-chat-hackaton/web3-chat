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
import { abi as SocketAbi } from "contracts/abi/Socket.abi";
import { useSockets } from "src/hooks/useSockets";

interface ChatParticipant {
  address: Address;
  alias?: string;
}

interface Chat {
  address: Address;
  socket: Contract<typeof SocketAbi>;
  subscriber?: Subscriber;
  lastMessageText?: string;
  lastMessageTimestamp?: string;
}

interface ChatsContextProps {
  chats: Chat[];
  createChat: Function;
}

const defaultContext: ChatsContextProps = {
  chats: [],
  createChat: new Function(),
};

export const ChatsContext = createContext<ChatsContextProps>(defaultContext);

export const ChatsProvider: FC<PropsWithChildren> = ({ children }) => {
  const provider = useVenomProvider();
  const { getSocket } = useSockets();
  const userSocket = useUserSocket();
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    if (userSocket) {
      getChats();
    }
  }, [userSocket]);

  const getChats = async () => {
    const events = await userSocket?.getPastEvents({});
    const addresses = events?.events?.map(({ data }) => {
      return data.fromAddress;
    });

    const unique = [...new Set(addresses)];

    unique.forEach((adr) => {
      createChat(adr);
    });
  };

  const createChat = async (address: string) => {
    const socket = await getSocket(address);
    setChats((current) => [
      ...current,
      { address: new Address(address), socket },
    ]);
  };

  return (
    <ChatsContext.Provider value={{ chats, createChat }}>
      {children}
    </ChatsContext.Provider>
  );
};
