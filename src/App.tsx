import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import { useChats } from "./hooks/useChats";
import { useCurrentState } from "./hooks/useCurrentState";
import { useSockets } from "./hooks/useSockets";
import { useStandaloneCryption } from "./hooks/useStandaloneCryption";
import { Layout } from "./layouts/Layout";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const App = () => {
  const { logOut } = useAuth();
  const { resetState } = useCurrentState();
  const { resetState: resetChats } = useChats();
  const { resetState: resetStandalone } = useStandaloneCryption();
  const { deleteUserSocket } = useSockets();

  const onLogOut = () => {
    logOut();
    deleteUserSocket();
    resetState();
    resetChats();
    resetStandalone();
  };

  useEffect(() => {
    onLogOut();
  }, []);

  return (
    <Wrapper>
      <Layout />
    </Wrapper>
  );
};

export default App;
