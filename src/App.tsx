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
  const [debug, setDebug] = useState(false);

  return (
    <Wrapper>
      <Layout />
      <div style={{ position: "absolute", top: "10px", left: "10px" }}>
        {debug ? (
          <>
            <div onClick={() => setDebug(false)}>X</div>
            <ThemeSwitcher />
            <LanguageChanger />
            <VenomWalletConnect />
          </>
        ) : (
          <div onClick={() => setDebug(true)}>debug</div>
        )}
      </div>
    </Wrapper>
  );
};

export default App;
