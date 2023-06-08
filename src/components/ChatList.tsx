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

  const sortedList = [...chats].sort(
    ({ lastMessageTimestamp: aTs }, { lastMessageTimestamp: bTs }) => {
      if (!bTs) return -1;
      if (!aTs) return 0;
      if (aTs < bTs) {
        return -1;
      }
      if (aTs > bTs) {
        return 1;
      }

      return 0;
    }
  );

  return (
    <Wrapper>
      {sortedList.map((chat) => {
        const onClick = () => {
          if (chat) {
            openChat(chat);
          }
        };
        return (
          <ChatItem
            onClick={onClick}
            key={chat.user.address?.toString()}
            {...chat}
          />
        );
      })}
    </Wrapper>
  );
};
