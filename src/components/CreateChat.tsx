import { Input } from "antd";
import { useInput } from "src/hooks/useInput";
import styled from "styled-components";
import { Button } from "./Button";
import { useSockets } from "src/hooks/useSockets";
import { FC, useState } from "react";
import { useChats } from "src/hooks/useChats";
import { useCurrentState } from "src/hooks/useCurrentState";

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

export const CreateChat: FC<any> = ({ forceClose }) => {
  const { getSocket } = useSockets();
  const { createChat } = useChats();
  const { openChat } = useCurrentState();
  const address = useInput();
  const message = useInput();
  const [error, setError] = useState("");

  const onCreateChat = async () => {
    const socket = await getSocket(address.value);
    if (!socket) {
        setError('User has no socket');
        return;
    }

    const newChat = await createChat(address.value, socket, message.value);
    openChat(newChat);
    forceClose();
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
