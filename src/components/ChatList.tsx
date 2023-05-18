import styled from "styled-components";
import { ChatItem } from "./ChatItem";

const chats = [
  {
    address:
      "0:e98cd3175c5e90530d685dd967ed3924f732d9b7e10f3a87324d0755f9907aee",
    alias: "Vitaliy Kornatskiy",
    lastMessageTimestamp: "2023-05-12T12:31:35.661247Z",
    lastMessageText: "Hello there",
  },
  {
    address:
      "0:40011381ab8e52ee4148b115e27da41061bbf96464f854ecbec93fc82cd9514d",
    alias: "Elon Musk",
    lastMessageTimestamp: "2023-05-15T12:31:35.661247Z",
    lastMessageText: "Yo",
  },
  {
    address:
      "0:fe6d2d2912e8283c2352e75e9bc23af08dd48a4bb73a0262ada752b00f8a243c",
    alias: "Takhir Adilzhanov",
    lastMessageTimestamp: "2023-05-13T12:31:35.661247Z",
    lastMessageText: "What's up",
  },
];

const Wrapper = styled.div`
`;

export const ChatList = () => {
  return (
    <Wrapper>
      {chats.map((chat, index) => (
        <ChatItem key={index} {...chat} />
      ))}
    </Wrapper>
  );
};
