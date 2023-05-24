import { Input } from "antd";
import { useInput } from "src/hooks/useInput";
import { useMessages } from "src/hooks/useMessages";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 46px 32px 24px 32px;
  position: relative;
`;

const StyledInput = styled(Input)`
  height: 100%;
  line-height: 10px;
`;

const SendButton = styled.div`
  position: absolute;
  cursor: pointer;
  right: 50px;
  bottom: 40px;
`;

export const MessageInput = () => {
  const { sendMessage } = useMessages();
  const input = useInput("");

  const onClick = () => {
    sendMessage(input.value);
  };

  return (
    <Wrapper>
      <StyledInput {...input} />
      <SendButton onClick={onClick}>Send</SendButton>
    </Wrapper>
  );
};
