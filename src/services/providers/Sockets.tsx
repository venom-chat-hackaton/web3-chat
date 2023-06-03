import {
  Address,
  Contract,
  ProviderRpcClient,
} from "everscale-inpage-provider";
import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { useMap } from "src/hooks/useMap";
import { useVenomProvider } from "src/hooks/useVenomProvider";
import { abi as AccountAbi } from "contracts/abi/Account.abi";
import { isEmptyAddress } from "src/utils/functions";
import { useLocalStorage } from "src/hooks/useLocalStorage";
import { useVenomWallet } from "src/hooks/useVenomWallet";
import { abi as SocketAbi } from "contracts/abi/Socket.abi";
import { accountAddress } from "src/utils/constants";

interface SocketsContextProps {
  getSocket: Function;
  createSocket: Function;
  updateUserSocket: Function;
  deleteUserSocket: Function;
  userSocket?: Contract<typeof SocketAbi>;
}

const defaultContext: SocketsContextProps = {
  getSocket: new Function(),
  createSocket: new Function(),
  updateUserSocket: new Function(),
  deleteUserSocket: new Function(),
};

export const SocketsContext =
  createContext<SocketsContextProps>(defaultContext);

export const SocketsProvider: FC<PropsWithChildren> = ({ children }) => {
  const provider = useVenomProvider();
  const wallet = useVenomWallet();
  const [sockets, addSocket] = useMap(new Map<string, string>());
  const [isUserSocketInitiated, setIsUserSocketInitiated] = useState(false);
  const [userSocket, setUserSocket] = useState<Contract<typeof SocketAbi>>();

  const deleteUserSocket = () => {
    setUserSocket(undefined);
    setIsUserSocketInitiated(false);
  };

  const updateUserSocket = async () => {
    if (!provider || !wallet.address) return;

    const socket = await getSocket(wallet?.address);

    const contract = new provider.Contract(SocketAbi, new Address(socket));

    setUserSocket(contract);
  };

  useEffect(() => {
    if (!isUserSocketInitiated && wallet?.address && provider) {
      setIsUserSocketInitiated(true);
      updateUserSocket();
    }
  }, [wallet, provider]);

  const createSocket = async () => {
    if (!provider || !wallet?.address) return;

    const contract = new provider.Contract(AccountAbi, accountAddress);
    await contract.methods
      .deploySocket({
        sendRemainingGasTo: wallet?.address,
      })
      .sendWithResult({
        amount: "500000000",
        from: wallet?.address,
        bounce: true,
      });
  };

  const getSocket = async (address: Address) => {
    const cache = sockets.get(address.toString());
    if (cache) return cache;

    if (!provider || isEmptyAddress(address)) return;

    const contract = new provider.Contract(AccountAbi, accountAddress);
    const result = await contract.methods
      .getSocketAddress({ owner: address })
      .call();
    const socketAddr = result.value0;

    if (isEmptyAddress(socketAddr)) {
      return null;
    } else {
      addSocket(address.toString(), socketAddr.toString());
      return socketAddr.toString();
    }
  };

  return (
    <SocketsContext.Provider
      value={{
        createSocket,
        getSocket,
        userSocket,
        updateUserSocket,
        deleteUserSocket,
      }}
    >
      {children}
    </SocketsContext.Provider>
  );
};
