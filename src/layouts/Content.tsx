import { ChatHeader } from "src/components/ChatHeader";
import { MessageInput } from "src/components/MessageInput";
import { MessageList } from "src/components/MessageList";
import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;

  grid-template-columns: 1fr;
  grid-template-rows: 92px 1fr 160px;
  max-height: 90vh;
`;

export const Content = () => {
  return (
    <Wrapper>
      <ChatHeader />
      <MessageList />
      <MessageInput />
    </Wrapper>
  );
};
