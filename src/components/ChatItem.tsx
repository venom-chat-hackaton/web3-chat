import moment from "moment";
import styled from "styled-components";
import { ExternalLink } from "./ExternalLink";
import { Copy } from "./Copy";

const Wrapper = styled.div<{ selected?: boolean }>`
  cursor: pointer;
  padding: 16px;
  width: 328px;

  font-size: 14px;
  line-height: 20px;
  font-weight: 400;

  border-bottom: 2px solid ${(props) => `${props.theme.colorBorder}`};
  background-color: ${(props) =>
    `${props.selected ? props.theme.colorBgContainer : "transparent"}`};

  &:hover {
    background-color: ${(props) => `${props.theme.colorBgContainer}`};
  }
`;

const Address = styled.div`
  display: flex;
  flex-direction: column;
`;
const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;
const Message = styled.div`
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const Timestamp = styled.div``;
const Hash = styled.code`
  display: flex;
  width: 150px;
  justify-content: space-between;
  align-items: center;

  & > .external-link {
    transition: opacity 0.1s ease;
    opacity: 0;
  }

  &:hover > .external-link {
    opacity: 1;
  }

  & > .copy {
    transition: opacity 0.1s ease;
    opacity: 0;
  }

  &:hover > .copy {
    opacity: 1;
  }
`;
const Alias = styled.div``;

export const ChatItem = ({
  onClick,
  user,
  alias,
  lastMessageTimestamp,
  lastMessageText,
  selected,
}: any) => {
  const address = user.address.toString();

  return (
    <Wrapper onClick={onClick} selected={selected}>
      <Info>
        <Address>
          <Hash>
            {address?.slice(0, 5)}...{address?.slice(-5)}
            <ExternalLink hash="address" />
            <Copy text={address?.toString()} />
          </Hash>
          <Alias>{alias}</Alias>
        </Address>
        {lastMessageTimestamp && (
          <Timestamp>{moment.unix(lastMessageTimestamp).fromNow()}</Timestamp>
        )}
      </Info>
      {lastMessageText && <Message>{lastMessageText}</Message>}
    </Wrapper>
  );
};
