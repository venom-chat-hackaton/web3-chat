import moment from "moment";
import { useAuth } from "src/hooks/useAuth";
import styled from "styled-components";

const Wrapper = styled.div<{ outgoing?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.outgoing ? "flex-end" : "flex-start")};
  margin-bottom: 16px;

  &:first-child {
    padding-top: 8px;
  }
`;

const Message = styled.div`
  width: fit-content;
`;
const Info = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
`;
const Text = styled.div`
  background: white;
  padding: 10px 14px;
  border-radius: 8px;
  color: #171717;
`;
const Sender = styled.div``;
const TimeAndHash = styled.div`
  display: flex;
`;
const Timestamp = styled.div``;
const Hash = styled.div``;

const me = "0:40011381ab8e52ee4148b115e27da41061bbf96464f854ecbec93fc82cd9514d";

export const MessageItem = ({ sender, timestamp, hash, text }: any) => {
  return (
    <Wrapper outgoing={sender === me}>
      <Message>
        <Info>
          <Sender>
            {sender?.slice(0, 5)}...{sender?.slice(-5)}
          </Sender>
          <TimeAndHash>
            <Hash>O</Hash>
            <Timestamp>{moment(timestamp).format("HH:mm")}</Timestamp>
          </TimeAndHash>
        </Info>
        <Text>{text}</Text>
      </Message>
    </Wrapper>
  );
};
