import { Address, Contract } from "everscale-inpage-provider";
import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { abi as UserAbi } from "contracts/abi/User.abi";
import { useVenomProvider } from "src/hooks/useVenomProvider";
import { useVenomWallet } from "src/hooks/useVenomWallet";
import { useSockets } from "src/hooks/useSockets";
import { useUserSocket } from "src/hooks/useUserSocket";
import { useMessages } from "src/hooks/useMessages";
import { Chat } from "./Chats";

interface StateContextProps {
  chat: Chat | {};
  openChat: (chat: Chat) => void;
  resetState: () => void;
}

const defaultContext: StateContextProps = {
  chat: {},
  openChat: () => void null,
  resetState: () => void null,
};

export const StateContext = createContext<StateContextProps>(defaultContext);

interface Recipient {
  address?: Address;
  socket?: Contract<typeof UserAbi>;
}

export const StateProvider: FC<PropsWithChildren> = ({ children }) => {
  const provider = useVenomProvider();
  const wallet = useVenomWallet();
  const [chat, setChat] = useState<Chat | {}>({});

  const resetState = () => {
    setChat({});
  };

  const openChat = async (chat: Chat) => {
    if (!provider || !wallet.address) return;

    setChat(chat);
  };

  return (
    <StateContext.Provider
      value={{
        chat,
        openChat,
        resetState,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
