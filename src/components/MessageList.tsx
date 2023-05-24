import styled from "styled-components";
import { MessageItem } from "./MessageItem";
import { useMessages } from "src/hooks/useMessages";

const Wrapper = styled.div`
  padding: 0px 32px;
  padding-top: 20px;
  height: 100%;
  overflow-y: scroll;
`;

export const MessageList = () => {
  const { messages } = useMessages();
  return (
    <Wrapper>
      {messages.map((message, index) => (
        <MessageItem key={index} {...message} />
      ))}
    </Wrapper>
  );
};
