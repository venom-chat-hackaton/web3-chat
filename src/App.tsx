import { LanguageChanger } from "./components/LanguageChanger";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { ChatAppPage } from "./pages/ChatApp";
import Auth from "./pages/Auth";
import { VenomWalletConnect } from "./components/VenomWalletConnect";
import { useState } from "react";

const App = () => {
  const [debug, setDebug] = useState(false);

  return (
    <>
      <ChatAppPage />
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
    </>
  );
};

export default App;
