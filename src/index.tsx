import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "src/services/providers/i18n";

import { ThemeProvider } from "./services/providers/Theme";
import { AuthProvider } from "./services/providers/Auth";
import { ChatsProvider } from "./services/providers/Chats";
import { StateProvider } from "./services/providers/State";
import { SocketsProvider } from "./services/providers/Sockets";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <SocketsProvider>
          <ChatsProvider>
            <StateProvider>
              <App />
            </StateProvider>
          </ChatsProvider>
        </SocketsProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
