import { Input } from "antd";
import { useInput } from "src/hooks/useInput";
import { useMessages } from "src/hooks/useMessages";
import styled from "styled-components";
import { Button } from "./Button";

const Wrapper = styled.div`
  padding: 46px 32px 24px 32px;
  position: relative;
`;

const StyledInput = styled(Input.TextArea)`
  height: 100%;
  line-height: 10px;
  resize: none !important;
  padding: 12px 15px;
`;

const SendButtonWrapper = styled.div`
  position: absolute;
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
      <StyledInput rows={3} placeholder="Message" {...input} />
      <SendButtonWrapper>
        <Button onClick={onClick} text="Send" type="primary" />
      </SendButtonWrapper>
    </Wrapper>
  );
};
