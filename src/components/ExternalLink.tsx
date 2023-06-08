import { FC } from "react";
import styled from "styled-components";

interface ExternalLinkProps {
  hash: string;
  type: string;
}

const ExternalIcon = styled.img`
  transition: filter 0.1s ease;
  width: 10px;
  height: 10px;
  filter: ${(props) => props.theme.colorTextBaseFilter};

  &:hover {
    filter: invert(57%) sepia(95%) saturate(399%) hue-rotate(112deg)
      brightness(95%) contrast(87%);
  }
`;

const StyledLink = styled.a``;

export const ExternalLink: FC<ExternalLinkProps> = ({ hash, type }) => {
  if (!hash) return null;
  const href = `https://devnet.venomscan.com/${type}/${hash}`;
  return (
    <StyledLink className="external-link" target="_blank" href={href}>
      <ExternalIcon src="/img/external-link.svg" />
    </StyledLink>
  );
};
