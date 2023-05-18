import { FC, PropsWithChildren, createContext } from "react";

interface MessagesContextProps {}

const defaultContext: MessagesContextProps = {};

export const MessagesContext =
  createContext<MessagesContextProps>(defaultContext);

export const MessagesProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <MessagesContext.Provider value={{}}>{children}</MessagesContext.Provider>
  );
};
