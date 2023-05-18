import { Address } from "everscale-inpage-provider";
import { FC, PropsWithChildren, createContext, useState } from "react";
import { useLocalStorage } from "src/hooks/useLocalStorage";

interface AliasesContextProps {
  setAlias: (address: Address, alias: string) => string;
  removeAlias: (address: Address) => void;
  getAlias: (address: Address) => string;
}

const defaultContext: AliasesContextProps = {
  setAlias: () => "",
  removeAlias: () => void null,
  getAlias: () => "",
};

export const AliasesContext =
  createContext<AliasesContextProps>(defaultContext);

type Aliases = {
  [k: string]: string;
};

export const AliasesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [cache, setCache] = useLocalStorage<Aliases>("ALIASES", {});
  const [aliases, setAliases] = useState<Aliases>(cache || {});

  const setAlias = (address: Address, alias: string): string => {
    const newAliases = { ...aliases, ...{ [address.toString()]: alias } };
    setCache(newAliases);
    setAliases(newAliases);
    return alias;
  };

  const removeAlias = (address: Address) => {
    if (!aliases[address.toString()]) return;

    delete aliases[address.toString()];

    setCache(aliases);
    setAliases(aliases);
  };

  const getAlias = (address: Address): string => {
    return aliases[address.toString()];
  };

  return (
    <AliasesContext.Provider value={{ removeAlias, setAlias, getAlias }}>
      {children}
    </AliasesContext.Provider>
  );
};
