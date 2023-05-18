import { Input } from "antd";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 46px 32px 24px 32px;
`;

const StyledInput = styled(Input)`
  height: 100%;
`;

export const MessageInput = () => {
  return (
    <Wrapper>
      <StyledInput />
    </Wrapper>
  );
};
