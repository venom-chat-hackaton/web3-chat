import {
  Address,
  Contract,
  ProviderRpcClient,
} from "everscale-inpage-provider";
import { box, randomBytes } from "tweetnacl";
import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { useMap } from "src/hooks/useMap";
import { useVenomProvider } from "src/hooks/useVenomProvider";
import { abi as FactoryAbi } from "contracts/abi/Factory.abi";
import { isEmptyAddress } from "src/utils/functions";
import { useVenomWallet } from "src/hooks/useVenomWallet";
import { abi as UserAbi } from "contracts/abi/User.abi";
import { accountAddress } from "src/utils/constants";
import { useCryption } from "src/hooks/useCryption";

interface SocketsContextProps {
  getSocket: Function;
  createSocket: Function;
  updateUserSocket: Function;
  deleteUserSocket: Function;
  userSocket?: Contract<typeof UserAbi>;
}

const defaultContext: SocketsContextProps = {
  getSocket: new Function(),
  createSocket: new Function(),
  updateUserSocket: new Function(),
  deleteUserSocket: new Function(),
};

export const SocketsContext =
  createContext<SocketsContextProps>(defaultContext);

function buf2hex(buffer: any) {
  // buffer is an ArrayBuffer
  return [...new Uint8Array(buffer)]
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
}

export const SocketsProvider: FC<PropsWithChildren> = ({ children }) => {
  const provider = useVenomProvider();
  const wallet = useVenomWallet();
  const [sockets, addSocket] = useMap(new Map<string, string>());
  const [isUserSocketInitiated, setIsUserSocketInitiated] = useState(false);
  const [userSocket, setUserSocket] = useState<Contract<typeof UserAbi>>();
  const { encrypt, decrypt } = useCryption();

  const deleteUserSocket = () => {
    setUserSocket(undefined);
    setIsUserSocketInitiated(false);
  };

  const updateUserSocket = async () => {
    if (!provider || !wallet.address) return;

    const socket = await getSocket(wallet?.address);

    if (!socket) return;
    setIsUserSocketInitiated(true);

    const contract = new provider.Contract(UserAbi, new Address(socket));
    console.log(contract);

    setUserSocket(contract);
  };

  useEffect(() => {
    if (!isUserSocketInitiated && wallet?.address && provider) {
      updateUserSocket();
    }
  }, [wallet, provider]);

  const createSocket = async () => {
    if (!provider || !wallet?.address || !wallet.publicKey) return;

    const { secretKey: uint8PrivateKey, publicKey: unit8PublicKey } =
      box.keyPair();
    const privateKey = buf2hex(uint8PrivateKey.buffer);
    const publicKey = buf2hex(unit8PublicKey.buffer);

    const encryptedData = await encrypt(privateKey);

    const contract = new provider.Contract(FactoryAbi, accountAddress);
    await contract.methods
      .deployUser({
        sendRemainingGasTo: wallet?.address,
        encryptedPrivateKey: encryptedData.data,
        publicKey: publicKey,
        privateKeyNonce: encryptedData.nonce,
      })
      .sendWithResult({
        amount: "500000000",
        from: wallet?.address,
        bounce: true,
      });

    updateUserSocket();
  };

  const getSocket = async (address: Address) => {
    const cache = sockets.get(address.toString());
    if (cache) return cache;

    if (!provider || isEmptyAddress(address)) return;

    const contract = new provider.Contract(FactoryAbi, accountAddress);
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
