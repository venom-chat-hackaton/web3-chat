import { ElementType, FC, HTMLAttributes } from "react";
import styled from "styled-components";

type ButtonType = "primary" | "default";

interface ButtonProps extends HTMLAttributes<HTMLDivElement> {
  type?: ButtonType;
  text: string;
  icon?: ElementType;
  iconSrc?: string;
}

const Wrapper = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 15px;
  border-radius: ${(props) => props.theme.borderRadius}px;
  border: 2px solid rgba(255, 255, 255, 0.3);

  &.default {
    background-color: #ffffff;

    &:hover {
      background-color: #ffffff;
    }
  }

  &.primary {
    color: ${(props) => props.theme.colorTextLightSolid};
    background-color: ${(props) => props.theme.colorPrimary};

    &:hover {
      background-color: ${(props) => props.theme.colorPrimaryHover};
    }
  }
`;

export const Button: FC<ButtonProps> = ({
  type = "default",
  text,
  icon: Icon,
  iconSrc,
  ...rest
}) => {
  return (
    <Wrapper className={type} {...rest}>
      {Icon && <Icon src={iconSrc} />}
      {text}
    </Wrapper>
  );
};
