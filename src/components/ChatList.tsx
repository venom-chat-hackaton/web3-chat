import styled from "styled-components";
import { ChatItem } from "./ChatItem";
import { useMessages } from "src/hooks/useMessages";
import { useVenomWallet } from "src/hooks/useVenomWallet";
import { useCurrentState } from "src/hooks/useCurrentState";
import { Address } from "everscale-inpage-provider";

const Wrapper = styled.div``;

export const ChatList = () => {
  const { openChat } = useCurrentState();
  const wallet = useVenomWallet();
  const { messages } = useMessages();
  const lastMessage = messages[messages.length - 1];

  return (
    <Wrapper>
      {[
        {
          address: wallet.address,
          alias: "Me",
          lastMessageTimestamp: lastMessage?.timestamp,
          lastMessageText: lastMessage?.message,
        },
        {
          address: new Address(
            "0:186025fd713e6b20b21346b7379c26d34004aba5229b259e35cfcddf0c57a4d4"
          ),
          alias: "Me",
          lastMessageTimestamp: lastMessage?.timestamp,
          lastMessageText: lastMessage?.message,
        },
      ].map((chat) => {
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
