import { useTheme } from "src/hooks/useTheme";

import styled from "styled-components";

export const ThemeWrap = styled.div`
  padding: 6px 8px;
  padding-bottom: 3px;
  border-radius: 20px;
  border: 2px solid ${(props) => `${props.theme.colorBorder}`};
  width: 53px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  cursor: pointer;
`;
const SelectedIcon = styled.div<{ isDark?: boolean }>`
  top: 3px;
  transition: left 0.3s ease;
  left: ${(props) => `${props.isDark ? "38" : "5"}px`};
  border-radius: 100%;
  position: absolute;
  height: 26px;
  width: 26px;
  background-color: ${(props) => `${props.theme.colorBorder}`};
`;
const IconSun = styled.img`
  width: 20px;
  height: 20px;
  filter: invert(67%) sepia(32%) saturate(5974%) hue-rotate(13deg)
    brightness(101%) contrast(108%);
`;
const IconMoon = styled.img`
  width: 20px;
  height: 20px;
  filter: invert(78%) sepia(21%) saturate(109%) hue-rotate(182deg)
    brightness(97%) contrast(84%);
`;
export const Button = styled.button`
  border: none;
  background: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
`;

export const ThemeSwitcher = () => {
  const { id, switchTheme } = useTheme();

  return (
    <ThemeWrap onClick={switchTheme}>
      <SelectedIcon isDark={id === "dark"} />
      <Button>
        <IconSun src="/img/icon-sun.svg" />
      </Button>
      <Button>
        <IconMoon src="/img/icon-moon.svg" />
      </Button>
    </ThemeWrap>
  );
};
