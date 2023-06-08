import styled from "styled-components";
import { Aside } from "./Aside";
import { useAuth } from "src/hooks/useAuth";
import { Initialization } from "src/pages/Initialization";
import { Auth } from "src/pages/Auth";
import { Content } from "./Content";
import { useUserSocket } from "src/hooks/useUserSocket";

const Wrapper = styled.div`
  margin: auto;
  border-radius: 8px;
  width: 1280px;
  display: grid;
  grid-template-columns: 360px 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  height: 90vh;
  border: 2px solid ${(props) => `${props.theme.colorBorder}`};
  background-color: ${(props) => `${props.theme.colorBgContainer}`};
`;

export const Layout = () => {
  const { wallet } = useAuth();
  const userSocket = useUserSocket();
  
  console.log(wallet);

  if (!wallet) {
    return (
      <Wrapper>
        <Auth />
      </Wrapper>
    );
  }

  if (!userSocket) {
    return (
      <Wrapper>
        <Initialization />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Aside />
      <Content />
    </Wrapper>
  );
};
