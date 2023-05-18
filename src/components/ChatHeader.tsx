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

const hash =
  "0:e98cd3175c5e90530d685dd967ed3924f732d9b7e10f3a87324d0755f9907aee";

export const ChatHeader = () => {
  return (
    <Wrapper>
      <Alias>Vitalik Buterin</Alias>
      <Hash>
        {hash?.slice(0, 5)}...{hash?.slice(-5)}
      </Hash>
    </Wrapper>
  );
};
