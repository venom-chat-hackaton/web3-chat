import { motion } from "framer-motion";
import { ChatHeader } from "src/components/ChatHeader";
import { MessageInput } from "src/components/MessageInput";
import { MessageList } from "src/components/MessageList";
import { useCurrentState } from "src/hooks/useCurrentState";
import styled from "styled-components";

const SelectionWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 18px;
`;

const Wrapper = styled(motion.div)`
  display: grid;

  grid-template-columns: 1fr;
  grid-template-rows: 92px 1fr 160px;
  max-height: 90vh;
`;

export const Content = () => {
  const { recipient } = useCurrentState();

  if (!recipient.address) {
    return <SelectionWrapper>Select a chat to start messaging</SelectionWrapper>
  }

  return (
    <Wrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ChatHeader />
      <MessageList />
      <MessageInput />
    </Wrapper>
  );
};
