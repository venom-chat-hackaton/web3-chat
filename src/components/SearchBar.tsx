import { Input } from "antd";
import styled from "styled-components";

const StyledInput = styled(Input)`
  width: 100%;
  height: 44px;
`;

const Wrapper = styled.div`
  padding: 0px 16px 12px 16px;
  border-bottom: 1px solid ${(props) => `${props.theme.colorTextBase}`};
`;

export const SearchBar = () => {
  return (
    <Wrapper>
      <StyledInput />
    </Wrapper>
  );
};
