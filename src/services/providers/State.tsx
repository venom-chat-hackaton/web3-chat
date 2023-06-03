import { Address, Contract } from "everscale-inpage-provider";
import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { abi as SocketAbi } from "contracts/abi/Socket.abi";
import { useVenomProvider } from "src/hooks/useVenomProvider";
import { useVenomWallet } from "src/hooks/useVenomWallet";
import { useSockets } from "src/hooks/useSockets";
import { useUserSocket } from "src/hooks/useUserSocket";
import { useMessages } from "src/hooks/useMessages";

interface StateContextProps {
  recipient: Recipient;
  messages: any[];
  openChat: (address: Address) => void;
  resetState: () => void;
}

const defaultContext: StateContextProps = {
  recipient: {},
  messages: [],
  openChat: () => void null,
  resetState: () => void null,
};

export const StateContext = createContext<StateContextProps>(defaultContext);

interface Recipient {
  address?: Address;
  socket?: Contract<typeof SocketAbi>;
}

export const StateProvider: FC<PropsWithChildren> = ({ children }) => {
  const { messages: mCache } = useMessages();
  const provider = useVenomProvider();
  const userSocket = useUserSocket();
  const { getSocket } = useSockets();
  const wallet = useVenomWallet();
  const [recipient, setRecipient] = useState<Recipient>({});
  const [messages, setMessages] = useState<any[]>([]);

  const resetState = () => {
    setRecipient({});
  };

  useEffect(() => {
    getChatMessages();
  }, [mCache, recipient]);

  const getChatMessages = () => {
    const msgs = [...mCache].filter(({ sender, recipient: mrecipient }) => {
      return (
        (sender === wallet.address?.toString() && recipient.address?.toString() === mrecipient) ||
        (sender === recipient.address?.toString() && wallet.address?.toString() === mrecipient)
      );
    });

    setMessages(msgs);
  };

  const openChat = async (address: Address) => {
    if (!provider || !wallet.address) return;
    const s = await getSocket(address.toString());
    const socket = new provider.Contract(SocketAbi, new Address(s));

    setRecipient({ address, socket });
  };

  return (
    <StateContext.Provider
      value={{
        recipient,
        messages,
        openChat,
        resetState,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
