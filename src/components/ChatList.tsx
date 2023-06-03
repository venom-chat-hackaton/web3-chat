import styled from "styled-components";
import { ChatItem } from "./ChatItem";
import { useMessages } from "src/hooks/useMessages";
import { useVenomWallet } from "src/hooks/useVenomWallet";
import { useCurrentState } from "src/hooks/useCurrentState";
import { Address } from "everscale-inpage-provider";
import { useChats } from "src/hooks/useChats";

const Wrapper = styled.div``;

export const ChatList = () => {
  const { openChat } = useCurrentState();
  const { chats } = useChats();
  const wallet = useVenomWallet();
  const { messages } = useMessages();
  const lastMessage = messages[messages.length - 1];

  return (
    <Wrapper>
      {chats.map((chat) => {
        const onClick = () => {
          if (chat.address) {
            openChat(chat.address);
          }
        };
        return (
          <ChatItem
            onClick={onClick}
            key={chat.address?.toString()}
            {...chat}
          />
        );
      })}
    </Wrapper>
  );
};
