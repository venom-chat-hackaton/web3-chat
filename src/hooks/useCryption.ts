import { useCallback } from "react";
import { useVenomProvider } from "./useVenomProvider";
import { useVenomWallet } from "./useVenomWallet";
import { isObject } from "class-validator";

interface EncryptedData {
  sourcePublicKey: string;
  recipientPublicKey: string;
  nonce: string;
  data: string;
}

export const useCryption = () => {
  const provider = useVenomProvider();
  const wallet = useVenomWallet();

  const encrypt = useCallback(
    async (
      data: any,
      recipientPublicKeys: string[] = []
    ): Promise<EncryptedData> => {
      if (!wallet?.publicKey)
        throw new Error("Encryption error: Public Key does not exist");
      if (!provider)
        throw new Error("Encryption error: Provider does not exist");

      const base64Data = btoa(
        isObject(data) ? JSON.stringify(data) : String(data)
      );

      const encryptedData = await provider?.encryptData({
        data: base64Data,
        algorithm: "ChaCha20Poly1305",
        publicKey: wallet.publicKey,
        recipientPublicKeys: [wallet.publicKey, ...recipientPublicKeys],
      });

      return encryptedData?.[0];
    },
    [provider, wallet]
  );

  const decrypt = useCallback(
    async (data: EncryptedData): Promise<string> => {
      if (!wallet?.publicKey)
        throw new Error("Encryption error: Public Key does not exist");
      if (!provider)
        throw new Error("Encryption error: Provider does not exist");

      const decryptedData = await provider.decryptData({
        algorithm: "ChaCha20Poly1305",
        ...data,
      });

      return atob(decryptedData);
    },
    [provider, wallet]
  );

  return {
    encrypt,
    decrypt,
  };
};
