import { useVenomWallet } from "src/hooks/useVenomWallet";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 20px 25px;
  font-size: 18px;
  line-height: 28px;
  font-weight: 500;
  border-bottom: 1px solid ${(props) => `${props.theme.colorTextBase}`};
`;

const Alias = styled.div`
  margin-bottom: 4px;
  font-size: 18px;
`;
const Hash = styled.div`
  font-size: 14px;
`;

export const ChatHeader = () => {
  const wallet = useVenomWallet();
  const address = wallet.address?.toString();

  return (
    <Wrapper>
      <Alias>Me</Alias>
      <Hash>
        {address?.slice(0, 5)}...{address?.slice(-5)}
      </Hash>
    </Wrapper>
  );
};
