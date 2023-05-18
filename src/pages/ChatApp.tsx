import { Layout } from "src/layouts/Layout";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ChatAppPage = () => {
  return (
    <Wrapper>
      <Layout />
    </Wrapper>
  );
};
