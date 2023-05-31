import { Address, Contract } from "everscale-inpage-provider";
import { FC, PropsWithChildren, createContext, useState } from "react";
import { abi as SocketAbi } from "contracts/abi/Socket.abi";
import { useVenomProvider } from "src/hooks/useVenomProvider";
import { useVenomWallet } from "src/hooks/useVenomWallet";

interface StateContextProps {
  recipient: Recipient;
  messages: Message[];
  openChat: (address: Address) => void;
}

const defaultContext: StateContextProps = {
  recipient: {},
  messages: [],
  openChat: () => void null,
};

export const StateContext = createContext<StateContextProps>(defaultContext);

interface Recipient {
  address?: Address;
  socket?: Contract<typeof SocketAbi>;
}

interface Message {}

export const StateProvider: FC<PropsWithChildren> = ({ children }) => {
  const provider = useVenomProvider();
  const wallet = useVenomWallet();
  const [recipient, setRecipient] = useState<Recipient>({});
  const [messages, setMessages] = useState<Message[]>([]);

  const openChat = (address: Address) => {
    if (!provider || !wallet.address) return;
    const socket = new provider.Contract(SocketAbi, address);
    setRecipient({ address, socket });
  };

  return (
    <StateContext.Provider
      value={{
        recipient,
        messages,
        openChat,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
