import { useContext } from "react";
import { SocketsContext } from "src/services/providers/Sockets";

export const useSockets = () => useContext(SocketsContext);
