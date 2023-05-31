import { motion } from "framer-motion";
import { ChatHeader } from "src/components/ChatHeader";
import { MessageInput } from "src/components/MessageInput";
import { MessageList } from "src/components/MessageList";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
  display: grid;

  grid-template-columns: 1fr;
  grid-template-rows: 92px 1fr 160px;
  max-height: 90vh;
`;

export const Content = () => {
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
