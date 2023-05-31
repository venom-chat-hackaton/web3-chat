import { useContext } from "react";
import { StateContext } from "src/services/providers/State";

export const useCurrentState = () => useContext(StateContext);
