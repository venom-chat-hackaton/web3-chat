import { useContext } from "react";
import { AliasesContext } from "src/services/providers/Aliases";

export const useAliases = () => useContext(AliasesContext);
