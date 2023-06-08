import { useContext } from "react";
import { StandaloneCryptionContext } from "src/services/providers/StandaloneCryption";
export const useStandaloneCryption = () => useContext(StandaloneCryptionContext);
