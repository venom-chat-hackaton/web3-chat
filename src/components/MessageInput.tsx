import { Input } from "antd";
import { useInput } from "src/hooks/useInput";
import { useMessages } from "src/hooks/useMessages";
import styled from "styled-components";
import { Button } from "./Button";
import { useVenomWallet } from "src/hooks/useVenomWallet";
import { Address } from "everscale-inpage-provider";

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
  const { sendMessage } = useMessages();
  const wallet = useVenomWallet();
  const input = useInput("");

  const onClick = () => {
    if (!input.value.trim()) return;
    sendMessage(input.value, wallet.address);
    input.clear();
  };
  const onDblClick = () => {
    if (!input.value.trim()) return;
    sendMessage(
      input.value,
      new Address(
        "0:a590a43905379121f0a870434999dc9a1ae9d1a4640810e31f26902b655b1e1a"
      )
    );
    input.clear();
  };

  return (
    <Wrapper>
      <StyledInput rows={3} placeholder="Message" {...input} />
      <SendButtonWrapper>
        <Button onClick={onClick} text="Send" type="primary" />
        {/* <Button onDoubleClick={onDblClick} text="Send" type="primary" /> */}
      </SendButtonWrapper>
    </Wrapper>
  );
};
