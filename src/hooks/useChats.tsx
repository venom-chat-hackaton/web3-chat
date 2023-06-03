import { useContext } from "react";
import { ChatsContext } from "src/services/providers/Chats";

export const useChats = () => useContext(ChatsContext);
