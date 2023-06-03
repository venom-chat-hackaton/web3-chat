import { Input } from "antd";
import { useInput } from "src/hooks/useInput";
import styled from "styled-components";
import { Button } from "./Button";
import { useSockets } from "src/hooks/useSockets";
import { useState } from "react";
import { useMessages } from "src/hooks/useMessages";

const Wrapper = styled.div`
  padding-top: 20px;
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledTextArea = styled(Input.TextArea)`
  resize: none !important;
  margin: 20px 0px;
`;

export const CreateChat = () => {
  const { getSocket } = useSockets();
  const { sendMessage } = useMessages();
  const address = useInput();
  const message = useInput();
  const [error, setError] = useState("");

  const onCreateChat = async () => {
    const socket = await getSocket(address.value);
    if (!socket) {
        setError('User has no socket');
        return;
    }

    await sendMessage(message.value, address.value, true);
  };

  return (
    <Wrapper>
      {error && error}
      <Input placeholder="Enter recipient address" {...address} />
      <StyledTextArea
        rows={3}
        placeholder="Enter initial message"
        {...message}
      />
      <Button onClick={onCreateChat} type="primary" text="Create Chat" />
    </Wrapper>
  );
};
