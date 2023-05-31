import { LanguageChanger } from "./components/LanguageChanger";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { VenomWalletConnect } from "./components/VenomWalletConnect";
import { useState } from "react";
import { Layout } from "./layouts/Layout";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const App = () => {
  return (
    <Wrapper>
      <Layout />
    </Wrapper>
  );
};

export default App;
