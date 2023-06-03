import { Address, Contract, ProviderRpcClient } from "everscale-inpage-provider";
import { abi as SocketAbi } from "contracts/abi/Socket.abi";
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

interface Wallet {
  publicKey: string;
  address: Address;
}

interface AuthContextProps {
  wallet?: Wallet;
  provider?: ProviderRpcClient;
  logIn: Function;
  logOut: Function;
  checkAuth: Function;
  hasInitialized: boolean;
  socketAddress?: string;
}

const defaultContext: AuthContextProps = {
  logIn: new Function(),
  logOut: new Function(),
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

  useEffect(() => {
    connection?.updateTheme(theme || "dark");
  }, [theme]);

  useEffect(
    () => {
      if (!provider) {
        setProvider(connection?.currentProvider)
      }
    },
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

  const onConnect = async () => {
    if (hasInitialized) return;
    await getInfo();
    setHasInitialized(true);
  };

  const checkAuth = async () => {
    const authenticated = await connection?.checkAuth();
    if (authenticated) return;
  };

  const logIn = async (updateSocket: any) => {
    if (!connection) return;

    await connection.connect();
    await updateSocket();
  };

  const logOut = () => {
    connection?.currentProvider?.disconnect();
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
        checkAuth,
        hasInitialized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
