import styled from "styled-components";
import { Aside } from "./Aside";
import { Content } from "./Content";

const Wrapper = styled.div`
  margin: auto;
  border-radius: 8px;
  width: 1280px;
  display: grid;
  grid-template-columns: 360px 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  height: 90vh;
  border: 1px solid ${(props) => `${props.theme.colorTextBase}`};
  box-shadow:  0px 0px 60px rgba(255,255,255,0.2);
`;

export const Layout = () => {
  return (
    <Wrapper>
      <Aside />
      <Content />
    </Wrapper>
  );
};
