import { motion } from "framer-motion";
import { AsideHeader } from "src/components/AsideHeader";
import { ChatList } from "src/components/ChatList";
import { SearchBar } from "src/components/SearchBar";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
  overflow: hidden;
  border-right: 2px solid ${(props) => `${props.theme.colorBorder}`};
`;

export const Aside = () => {
  return (
    <Wrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <AsideHeader />
      <SearchBar />
      <ChatList />
    </Wrapper>
  );
};
