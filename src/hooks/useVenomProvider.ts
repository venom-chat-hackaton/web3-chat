import { useAuth } from "./useAuth";

export const useVenomProvider = () => {
  const { provider } = useAuth();
  return provider;
};
