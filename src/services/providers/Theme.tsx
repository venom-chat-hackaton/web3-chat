import { ConfigProvider } from "antd";
import { AliasToken, useToken } from "antd/es/theme/internal";
import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { theme } from "src/assets/theme";
import { useLocalStorage } from "src/hooks/useLocalStorage";
import { ThemeContext as SCThemeContext } from "styled-components";
const { dark, light } = theme;

export enum Theme {
  Light = "light",
  Dark = "dark",
}

interface ThemeContextProps {
  id?: Theme;
  theme: Partial<AliasToken>;
  switchTheme: () => void;
}

const defaultContext: ThemeContextProps = {
  theme: light,
  id: Theme.Light,
  switchTheme: () => void null,
};

const themes: Record<Theme, Partial<AliasToken>> = {
  [Theme.Light]: light,
  [Theme.Dark]: dark,
};

export const ThemeContext = createContext<ThemeContextProps>(defaultContext);

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [id, setId] = useLocalStorage("THEME", Theme.Light);
  const [theme, setTheme] = useState<Partial<AliasToken>>(
    id ? themes[id] : defaultContext.theme
  );

  useEffect(() => {
    document.body.style.backgroundColor = String(theme.colorBgBase);
    document.body.style.color = String(theme.colorTextBase);
  }, [theme]);

  const switchTheme = () => {
    const newTheme = id === Theme.Light ? Theme.Dark : Theme.Light;
    setTheme(themes[newTheme]);
    setId(newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        id,
        theme,
        switchTheme,
      }}
    >
      <SCThemeContext.Provider value={theme}>
        <ConfigProvider
          theme={{
            hashed: false,
            token: theme,
          }}
        >
          {children}
        </ConfigProvider>
      </SCThemeContext.Provider>
    </ThemeContext.Provider>
  );
};
