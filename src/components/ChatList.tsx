import styled from "styled-components";
import { ChatItem } from "./ChatItem";
import { useMessages } from "src/hooks/useMessages";
import { useVenomWallet } from "src/hooks/useVenomWallet";

const Wrapper = styled.div``;

export const ChatList = () => {
  const wallet = useVenomWallet();
  const { messages } = useMessages();
  const lastMessage = messages[messages.length - 1];

  return (
    <Wrapper>
      {[
        {
          address: wallet.address?.toString(),
          alias: "Me",
          lastMessageTimestamp: lastMessage?.timestamp,
          lastMessageText: lastMessage?.message,
        },
      ].map((chat, index) => (
        <ChatItem key={index} {...chat} />
      ))}
    </Wrapper>
  );
};
