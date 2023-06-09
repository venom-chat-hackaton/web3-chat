import { useAuth } from "src/hooks/useAuth";
import { Button } from "./Button";
import styled from "styled-components";
import WalletIcon from '/img/venom-wallet-icon.png';

const VenomWalletIcon = styled.img`
  max-width: 35px;
  max-height: 35px;
  margin-right: 10px;
`;

export const ConnectWalletButton = () => {
  const { logIn } = useAuth();
  
  const onClick = () => {
    logIn();
  };

  return (
    <Button
      onClick={onClick}
      type="primary"
      text="Connect Venom Wallet"
      icon={VenomWalletIcon}
      iconSrc={WalletIcon}
    />
  );
};
