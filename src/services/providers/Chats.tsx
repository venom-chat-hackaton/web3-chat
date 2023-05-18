import { Address } from "everscale-inpage-provider";
import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useState,
} from "react";
import { useVenomProvider } from "src/hooks/useVenomProvider";
import { useVenomWallet } from "src/hooks/useVenomWallet";

interface ChatParticipant {
  address: Address;
  alias?: string;
}

interface Chat {
  recipient: ChatParticipant;
  lastMessageText: string;
  lastMessageTimestamp: string;
}

interface ChatsContextProps {}

const defaultContext: ChatsContextProps = {};

export const ChatsContext = createContext<ChatsContextProps>(defaultContext);

export const ChatsProvider: FC<PropsWithChildren> = ({ children }) => {
  const provider = useVenomProvider();
  const wallet = useVenomWallet();

  const [selectedChat, selectChat] = useState<Chat | undefined>();
  const [chats, setChats] = useState<Chat[]>([]);

  const getChats = useCallback(() => {
    // setChats();
  }, [wallet, provider]);

  const createChat = () => {};
  const addChat = () => {};
  const hideChat = () => {};

  return (
    <ChatsContext.Provider
      value={{ selectedChat, selectChat, chats, createChat, hideChat }}
    >
      {children}
    </ChatsContext.Provider>
  );
};
