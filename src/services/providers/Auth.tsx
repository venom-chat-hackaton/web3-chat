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

interface Wallet {
  publicKey: string;
  address: Address;
}

interface AuthContextProps {
  wallet?: Wallet;
  provider?: ProviderRpcClient;
  logIn: Function;
  logOut: Function;
}

const defaultContext: AuthContextProps = {
  logIn: new Function(),
  logOut: new Function(),
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
    await getInfo();
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
