import { useSockets } from "./useSockets";

export const useUserSocket = () => {
  const { userSocket } = useSockets();
  return userSocket;
};
