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
import { useLocalStorage } from "src/hooks/useLocalStorage";

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
  checkSocket: Function;
  checkAuth: Function;
  hasInitialized: boolean;
  socketAddress?: string;
}

const defaultContext: AuthContextProps = {
  logIn: new Function(),
  logOut: new Function(),
  createSocket: new Function(),
  checkSocket: new Function(),
  checkAuth: new Function(),
  hasInitialized: false,
  socketAddress: "",
};

export const AuthContext = createContext<AuthContextProps>(defaultContext);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { id: theme } = useTheme();
  const [hasInitialized, setHasInitialized] = useState(false);
  const [connection, setConnection] = useState<VenomConnect>();
  const [provider, setProvider] = useState<ProviderRpcClient>();
  const [wallet, setWallet] = useState<Wallet>();
  const [socketAddress, setSocketAddress, deleteSocketAddress] =
    useLocalStorage("SOCKET_ADDRESS", "");

  useEffect(() => {
    connection?.updateTheme(theme || 'dark');
  }, [theme]);

  useEffect(
    () => setProvider(connection?.currentProvider),
    [connection?.currentProvider]
  );

  useEffect(() => {
    initConnection();
  }, []);

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
        amount: "50000000",
        from: wallet?.address,
        bounce: true,
      });

    const socketAddress =
      result?.childTransaction?.outMessages[0]?.dst?.toString();
    setSocketAddress(String(socketAddress));
    await openSocket();
  };

  const checkSocket = () => new Promise((resolve) => setTimeout(resolve, 500));

  const onConnect = async () => {
    await getInfo();
    setHasInitialized(true);
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
    deleteSocketAddress();
    setWallet(undefined);
  };

  const getInfo = async () => {
    const state = await connection?.currentProvider?.getProviderState();
    const address = state?.permissions?.accountInteraction?.address;
    const publicKey = state?.permissions.accountInteraction?.publicKey;

    if (!address && !publicKey) return;

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
        checkSocket,
        checkAuth,
        hasInitialized,
        socketAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
