import { useVenomWallet } from "src/hooks/useVenomWallet";
import styled from "styled-components";
import { ExternalLink } from "./ExternalLink";
import { Copy } from "./Copy";
import { useCurrentState } from "src/hooks/useCurrentState";

const Wrapper = styled.div`
  padding: 20px 25px;
  font-size: 18px;
  line-height: 28px;
  font-weight: 500;
  border-bottom: 2px solid ${(props) => `${props.theme.colorBorder}`};
`;

const Alias = styled.div`
  margin-bottom: 4px;
  font-size: 18px;
`;
const Hash = styled.div`
  font-family: monospaced;
  font-size: 14px;
  display: flex;
  width: 150px;
  justify-content: space-between;
  align-items: center;
`;

export const ChatHeader = () => {
  const { chat } = useCurrentState();
   
  // @ts-ignore
  const address = chat?.wallet?.toString();

  if (!address) return null;

  return (
    <Wrapper>
      {/* <Alias>Me</Alias> */}
      <Hash>
        <code>
          {address?.slice(0, 5)}...{address?.slice(-5)}
        </code>
        <ExternalLink type="accounts" hash={address} />
        <Copy text={address?.toString()} />
      </Hash>
    </Wrapper>
  );
};
