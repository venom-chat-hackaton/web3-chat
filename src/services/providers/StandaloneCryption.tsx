import { FC, PropsWithChildren, createContext } from "react";
import { useUserSocket } from "src/hooks/useUserSocket";

interface StandaloneCryptionContextProps {}

const defaultContext: StandaloneCryptionContextProps = {};

export const StandaloneCryptionContext =
  createContext<StandaloneCryptionContextProps>(defaultContext);

export const StandaloneCryptionProvider: FC<PropsWithChildren> = ({ children }) => {
  const userSocket = useUserSocket();
  return (
    <StandaloneCryptionContext.Provider value={{}}>{children}</StandaloneCryptionContext.Provider>
  );
};
