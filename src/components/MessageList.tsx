import styled from "styled-components";
import { MessageItem } from "./MessageItem";
import { useEffect, useRef } from "react";
import { useCurrentState } from "src/hooks/useCurrentState";
import { useForceRender } from "src/hooks/useForceRender";

const Wrapper = styled.div`
  padding: 0px 32px;
  padding-top: 20px;
  height: 100%;
  overflow-y: scroll;
`;

export const MessageList = () => {
  const { chat } = useCurrentState();
  const forceUpdate = useForceRender();
  // @ts-ignore
  const messages = chat.messages;
  const bottomRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(forceUpdate, 500);
    () => clearInterval(interval);
  }, []);

  useEffect(
    // @ts-ignore
    () => bottomRef.current?.scrollIntoView({ behavior: "smooth" }),
    [messages]
  );

  return (
    <Wrapper>
      {messages.map((message: any, index: number) => (
        <MessageItem key={index} {...message} />
      ))}
      <div ref={bottomRef} />
    </Wrapper>
  );
};
