import { AsideHeader } from "src/components/AsideHeader";
import { ChatList } from "src/components/ChatList";
import { SearchBar } from "src/components/SearchBar";
import styled from "styled-components";

const Wrapper = styled.div`
  overflow: hidden;
  border-right: 1px solid ${(props) => `${props.theme.colorTextBase}`};
`;

export const Aside = () => {
  return (
    <Wrapper>
      <AsideHeader />
      <SearchBar />
      <ChatList />
    </Wrapper>
  );
};
