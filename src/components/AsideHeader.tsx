import { useVenomWallet } from "src/hooks/useVenomWallet";
import styled from "styled-components";

const HeaderText = styled.div`
  padding: 20px 0px 20px 25px;
  font-size: 18px;
  line-height: 28px;
  font-weight: 500px;
`;

export const AsideHeader = () => {
  const wallet = useVenomWallet();
  const address = wallet.address?.toString();

  return (
    <HeaderText>
      {address && address?.slice(0, 5)}...{address?.slice(-5)}
      <br />
      {Number(wallet.balance) / 1000000000} VENOM
    </HeaderText>
  );
};
