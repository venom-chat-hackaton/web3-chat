import styled from "styled-components";
import { ThemeSwitcher } from "./ThemeSwitcher";

const Wrapper = styled.div`
  width: 100%;
`;

const ThemeWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Settings = () => {
  return (
    <Wrapper>
      <ThemeWrapper>
        <div>Theme</div>
        <ThemeSwitcher />
      </ThemeWrapper>
    </Wrapper>
  );
};
