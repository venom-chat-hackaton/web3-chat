import { motion } from "framer-motion";
import moment from "moment";
import { useVenomWallet } from "src/hooks/useVenomWallet";
import styled from "styled-components";
import { ExternalLink } from "./ExternalLink";
import { Spin } from "antd";

const Wrapper = styled(motion.div)<{ outgoing?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.outgoing ? "flex-end" : "flex-start")};
  text-align: ${(props) => (props.outgoing ? "right" : "left")};
  margin-bottom: 16px;

  &:first-child {
    padding-top: 8px;
  }
`;

const Message = styled.div<{ outgoing?: boolean }>`
  display: flex;
  flex-direction: column;
  word-wrap: break-word;
  align-items: ${(props) => (props.outgoing ? "flex-end" : "flex-start")};
`;
const Text = styled.div<{ outgoing?: boolean }>`
  position: relative;
  width: fit-content;
  max-width: 300px;
  background: ${(props) =>
    props.outgoing ? props.theme.colorPrimary : props.theme.colorMessageBg};
  padding: 10px 14px;
  border-radius: 8px;
  ${(props) => `border-top-${props.outgoing ? "right" : "left"}-radius: 2px;`}
  color: ${(props) =>
    props.outgoing
      ? props.theme.colorTextLightSolid
      : props.theme.colorMessageText};
`;
const TimeAndHash = styled.div<{ outgoing?: boolean }>`
  font-size: 12px;
  display: flex;
  flex-direction: ${(props) => (props.outgoing ? "row" : "row-reverse")};
  justify-content: ${(props) => (props.outgoing ? "flex-end" : "flex-start")};
  width: 52px;
  align-items: center;
  margin: 0px 6px;
  margin-bottom: 6px;
  text-align: right;
  height: 17.5px;
`;
const StyledSpin = styled(Spin)`
  position: absolute;
  bottom: 0;
  left: -20px;
`;
const Timestamp = styled.code<{ outgoing?: boolean }>`
  ${(props) => (props.outgoing ? "margin-left: 6px;" : "margin-right: 6px;")};
`;

export const MessageItem = ({
  sender,
  recipient,
  timestamp,
  hash,
  text,
  pending,
  messageHash,
}: any) => {
  const wallet = useVenomWallet();
  const me = wallet.address?.toString();
  const outgoing = sender.toString() === me;

  return (
    <Wrapper
      outgoing={outgoing}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Message outgoing={outgoing}>
        <TimeAndHash outgoing={outgoing}>
          <ExternalLink type="transactions" hash={hash} />
          <Timestamp outgoing={outgoing}>
            {moment.unix(timestamp).format("HH:mm")}
          </Timestamp>
        </TimeAndHash>
        <Text outgoing={outgoing}>
          {text}
          {pending && <StyledSpin size="small" />}
        </Text>
      </Message>
    </Wrapper>
  );
};
