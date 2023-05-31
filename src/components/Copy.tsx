import { FC } from "react";
import styled from "styled-components";

interface CopyProps {
  text?: string;
}

const CopyIcon = styled.img`
  cursor: pointer;
  transition: filter 0.1s ease;
  width: 10px;
  height: 10px;
  filter: ${(props) => props.theme.colorTextBaseFilter};

  &:hover {
    filter: invert(57%) sepia(95%) saturate(399%) hue-rotate(112deg)
      brightness(95%) contrast(87%);
  }
`;

export const Copy: FC<CopyProps> = ({ text }) => {
  const onClick = () => {
    navigator.clipboard.writeText(String(text));
  };
  return <CopyIcon className="copy" onClick={onClick} src="/img/copy-icon.svg" />;
};
