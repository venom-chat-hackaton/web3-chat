import { useAuth } from "src/hooks/useAuth";
import styled from "styled-components";

const Wrapper = styled.div``;

export const VenomWalletConnect = () => {
  const { logIn, logOut } = useAuth();

  return (
    <div>
      <div onClick={() => logIn()}>Login with VenomWallet</div>
      <div onClick={() => logOut()}>Logout</div>
    </div>
  );
};
