import { Address, ProviderRpcClient } from "everscale-inpage-provider";
import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { VenomConnect } from "venom-connect";
import { initVenomConnect } from "./initVenomConnect";
import { useTheme } from "src/hooks/useTheme";
import { abi as AccountAbi } from "contracts/abi/Account.abi";
import { abi as SocketAbi } from "contracts/abi/Socket.abi";

interface Wallet {
  publicKey: string;
  address: Address;
}

interface AuthContextProps {
  wallet?: Wallet;
  provider?: ProviderRpcClient;
  logIn: Function;
  logOut: Function;
  createSocket: Function;
}

const defaultContext: AuthContextProps = {
  logIn: new Function(),
  logOut: new Function(),
  createSocket: new Function(),
};

export const AuthContext = createContext<AuthContextProps>(defaultContext);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { id: theme } = useTheme();
  const [connection, setConnection] = useState<VenomConnect>();
  const [provider, setProvider] = useState<ProviderRpcClient>();
  const [wallet, setWallet] = useState<Wallet>();

  useEffect(() => {
    connection?.updateTheme(theme);
  }, [theme]);

  useEffect(
    () => setProvider(connection?.currentProvider),
    [connection?.currentProvider]
  );

  useEffect(() => {
    initConnection();
  }, []);

  useEffect(() => {
    openSocket();
  }, [provider])

  useEffect(() => {
    const registerHandlers = () => {
      const connect = connection?.on("connect", onConnect);

      if (!connection) return;

      checkAuth();

      return [connect];
    };
    const handlers = registerHandlers();

    return () => {
      handlers?.forEach((off) => off?.());
    };
  }, [connection]);

  const initConnection = async () => {
    const connection = await initVenomConnect(theme);

    setConnection(connection);
  };

  const openSocket = async () => {
    const socket = localStorage.getItem("SOCKET_ADDRESS") as string;
    if (!provider || !socket || !wallet?.address) return;

    const address = new Address(socket);
    const contract = new provider.Contract(SocketAbi, address);
    await contract.methods
      .openSocket()
      .send({ from: wallet?.address, amount: "100000000" });
  };

  const createSocket = async () => {
    if (!provider || !wallet?.address) return;

    const address = new Address(
      "0:b4acf1de005d5dc1f4cdefb0e3bc5cb50eb6f26af30c886e28fc74a26417bf23"
    );
    const contract = new provider.Contract(AccountAbi, address);
    const result = await contract.methods
      .deploySocket({
        sendRemainingGasTo: wallet?.address,
      })
      .sendWithResult({
        amount: "1000000000",
        from: wallet?.address,
        bounce: true,
      });

    const socketAddress =
      result?.childTransaction?.outMessages[0]?.dst?.toString();
    localStorage.setItem("SOCKET_ADDRESS", String(socketAddress));
    await openSocket();
  };

  const onConnect = async () => {
    await getInfo();
    await openSocket();
  };

  const checkAuth = async () => {
    const authenticated = await connection?.checkAuth();
    if (authenticated) return;
  };

  const logIn = async () => {
    if (!connection) return;

    await connection.connect();
  };

  const logOut = () => {
    connection?.currentProvider?.disconnect();
    setWallet(undefined);
  };

  const getInfo = async () => {
    const state = await connection?.currentProvider?.getProviderState();
    const address = state?.permissions?.accountInteraction?.address;
    const publicKey = state?.permissions.accountInteraction?.publicKey;

    setWallet({ address, publicKey });
  };

  return (
    <AuthContext.Provider
      value={{
        wallet,
        provider,
        logIn,
        logOut,
        createSocket,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
