import { useContext } from "react";
import { MessagesContext } from "src/services/providers/Messages";

export const useMessages = () => useContext(MessagesContext);
