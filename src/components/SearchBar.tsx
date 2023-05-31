import { Input } from "antd";
import styled from "styled-components";

const StyledInput = styled(Input)`
  width: 100%;
  height: 44px;
`;

const Wrapper = styled.div`
  padding: 0px 16px 12px 16px;
  border-bottom: 2px solid ${(props) => `${props.theme.colorBorder}`};
`;

export const SearchBar = () => {
  return (
    <Wrapper>
      <StyledInput placeholder="Search for message" />
    </Wrapper>
  );
};
