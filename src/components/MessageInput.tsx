import { Input } from "antd";
import { useInput } from "src/hooks/useInput";
import styled from "styled-components";
import { Button } from "./Button";
import { useVenomWallet } from "src/hooks/useVenomWallet";
import { Address } from "everscale-inpage-provider";
import { useCurrentState } from "src/hooks/useCurrentState";
import { useChats } from "src/hooks/useChats";

const Wrapper = styled.div`
  padding: 46px 32px 24px 32px;
  position: relative;
`;

const StyledInput = styled(Input.TextArea)`
  height: 100%;
  line-height: 10px;
  resize: none !important;
  padding: 12px 15px;
  padding-right: 100px;
`;

const SendButtonWrapper = styled.div`
  position: absolute;
  right: 50px;
  bottom: 40px;
`;

export const MessageInput = () => {
  const { sendMessage } = useChats();
  const input = useInput("");
  const { chat } = useCurrentState();

  const onClick = () => {
    if (!input.value.trim()) return;
    sendMessage(input.value, chat);
    input.clear();
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
