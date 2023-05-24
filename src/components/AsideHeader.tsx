import { useAuth } from "src/hooks/useAuth";
import { useVenomWallet } from "src/hooks/useVenomWallet";
import styled from "styled-components";

const HeaderText = styled.div`
  padding: 20px 0px 20px 25px;
  font-size: 18px;
  line-height: 28px;
  font-weight: 500px;
`;

const CreateSocketButton = styled.div`
  font-size: 8px;
  border: 1px solid ${({ theme }) => theme.colorTextBase};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  line-height: 12px;
  margin-left: 6px;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => `${props.theme.colorBgContainer}`};
  }
`;

const TickIcon = styled.div`
  color: green;
  display: inline;
  margin-left: 10px;
`;

export const AsideHeader = () => {
  const { createSocket } = useAuth();
  const wallet = useVenomWallet();
  const address = wallet.address?.toString();
  const socket = localStorage.getItem("SOCKET_ADDRESS");

  const onClick = () => {
    createSocket();
  }

  return (
    <HeaderText>
      <>
        {address && address?.slice(0, 5)}...{address?.slice(-5)}
      </>
      {socket ? (
        <TickIcon>✓</TickIcon>
      ) : (
        <CreateSocketButton onClick={onClick}>Create socket</CreateSocketButton>
      )}
      <br />
      {Number(wallet.balance) / 1000000000} VENOM
    </HeaderText>
  );
};
