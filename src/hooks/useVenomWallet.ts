import { useAuth } from "./useAuth";
import { useVenomProvider } from "./useVenomProvider";
import { useEffect, useState } from "react";

export const useVenomWallet = () => {
  const { wallet } = useAuth();
  const [balance, setBalance] = useState("");
  const provider = useVenomProvider();

  useEffect(() => {
    const getBalance = async () => {
      if (wallet?.address) {
        const response = await provider?.getBalance(wallet?.address);
        setBalance(String(response));
      } else {
        setBalance("");
      }
    };

    getBalance();
  }, [wallet, provider]);

  return { ...wallet, balance };
};
