import styled from "styled-components";
import { MessageItem } from "./MessageItem";
import { useMessages } from "src/hooks/useMessages";
import { useEffect, useRef } from "react";
import { useCurrentState } from "src/hooks/useCurrentState";

const Wrapper = styled.div`
  padding: 0px 32px;
  padding-top: 20px;
  height: 100%;
  overflow-y: scroll;
`;

export const MessageList = () => {
  const { messages } = useCurrentState();
  const bottomRef = useRef(null);

  const sortedList = [...messages].sort(
    ({ timestamp: aTs }, { timestamp: bTs }) => {
      if (aTs < bTs) {
        return -1;
      }
      if (aTs > bTs) {
        return 1;
      }
      // a must be equal to b
      return 0;
    }
  );

  useEffect(
    // @ts-ignore
    () => bottomRef.current?.scrollIntoView({ behavior: "smooth" }),
    [messages]
  );

  return (
    <Wrapper>
      {sortedList.map((message, index) => (
        <MessageItem key={index} {...message} />
      ))}
      <div ref={bottomRef} />
    </Wrapper>
  );
};
