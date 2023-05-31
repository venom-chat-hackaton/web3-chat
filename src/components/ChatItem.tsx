import moment from "moment";
import styled from "styled-components";

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
const Message = styled.div``;
const Timestamp = styled.div``;
const Hash = styled.div``;
const Alias = styled.div``;

export const ChatItem = ({
  address,
  alias,
  lastMessageTimestamp,
  lastMessageText,
  selected,
}: any) => {
  return (
    <Wrapper selected={selected}>
      <Info>
        <Address>
          <Hash>
            {address?.slice(0, 5)}...{address?.slice(-5)}
          </Hash>
          <Alias>{alias}</Alias>
        </Address>
        <Timestamp>{moment(lastMessageTimestamp).fromNow()}</Timestamp>
      </Info>
      <Message>{lastMessageText}</Message>
    </Wrapper>
  );
};
