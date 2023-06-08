import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { useUserSocket } from "src/hooks/useUserSocket";
import { useVenomProvider } from "src/hooks/useVenomProvider";
import { useCryption } from "src/hooks/useCryption";
import { useVenomWallet } from "src/hooks/useVenomWallet";
import { box, randomBytes } from "tweetnacl";
import {
  decodeUTF8,
  encodeUTF8,
  encodeBase64,
  decodeBase64,
} from "tweetnacl-util";
import { fromHexString } from "src/utils/functions";

interface StandaloneCryptionContextProps {
  keys: any;
  resetState: Function;
  encrypt: Function;
  decrypt: Function;
}

const defaultContext: StandaloneCryptionContextProps = {
  keys: {},
  resetState: new Function(),
  encrypt: new Function(),
  decrypt: new Function(),
};

export const StandaloneCryptionContext =
  createContext<StandaloneCryptionContextProps>(defaultContext);

export const StandaloneCryptionProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const wallet = useVenomWallet();
  const provider = useVenomProvider();
  const userSocket = useUserSocket();
  const { decrypt: venomDecrypt } = useCryption();
  const [keys, setKeys] = useState<any>({});
  const [initialized, setInitialized] = useState(false);

  const resetState = () => {
    setInitialized(false);
    setKeys(undefined);
  };

  const initialize = async () => {
    if (!provider || !userSocket || initialized || !wallet.publicKey) return;

    setInitialized(true);

    const encryptedPrivateDataResponse = await userSocket.methods
      .getEncryptedPrivateKeyData()
      .call();
    const encryptedPrivateKey =
      encryptedPrivateDataResponse.value0.encryptedPrivateKey;
    const privateKeyNonce = encryptedPrivateDataResponse.value0.privateKeyNonce;
    const publicKeyResponse = await userSocket.methods.getPublicKey().call();
    const publicKey = publicKeyResponse.value0;

    const privateKey = await venomDecrypt({
      sourcePublicKey: wallet?.publicKey,
      recipientPublicKey: wallet?.publicKey,
      nonce: privateKeyNonce,
      data: encryptedPrivateKey,
    });

    setKeys({ privateKey, publicKey });
  };

  useEffect(() => {
    initialize();
  }, [userSocket, provider]);

  const newNonce = () => randomBytes(box.nonceLength);

  const encrypt = (message: string, recipientPublicKey: string) => {
    const nonce = newNonce();
    const messageUint8 = decodeUTF8(JSON.stringify(message));
    const sharedSecret = box.before(
      fromHexString(recipientPublicKey),
      fromHexString(keys.privateKey)
    );
    const encrypted = box.after(messageUint8, nonce, sharedSecret);

    const fullMessage = new Uint8Array(nonce.length + encrypted.length);
    fullMessage.set(nonce);
    fullMessage.set(encrypted, nonce.length);

    const base64FullMessage = encodeBase64(fullMessage);
    return base64FullMessage;
  };

  const decrypt = (messageWithNonce: string, senderPublicKey: string) => {
    const messageWithNonceAsUint8Array = decodeBase64(messageWithNonce);
    const nonce = messageWithNonceAsUint8Array.slice(0, box.nonceLength);
    const message = messageWithNonceAsUint8Array.slice(
      box.nonceLength,
      messageWithNonce.length
    );

    const sharedSecret = box.before(
      fromHexString(senderPublicKey),
      fromHexString(keys.privateKey)
    );
    const decrypted = box.open.after(message, nonce, sharedSecret);

    if (!decrypted) {
      throw new Error("Could not decrypt message");
    }

    const base64DecryptedMessage = encodeUTF8(decrypted);
    return JSON.parse(base64DecryptedMessage);
  };

  return (
    <StandaloneCryptionContext.Provider
      value={{ encrypt, decrypt, resetState, keys }}
    >
      {children}
    </StandaloneCryptionContext.Provider>
  );
};
