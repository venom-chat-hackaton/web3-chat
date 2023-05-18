import styled from "styled-components";
import { MessageItem } from "./MessageItem";

const messages = [
  {
    sender:
      "0:e98cd3175c5e90530d685dd967ed3924f732d9b7e10f3a87324d0755f9907aee",
    timestamp: "2023-05-12T12:31:35.661247Z",
    hash: "0:e98cd3175c5e90530d685dd967ed3924f732d9b7e10f3a87324d0755f9907aee",
    text: "Hello worldHello worldHello worldHello worldHello worldHello worldHello world",
  },
  {
    sender:
      "0:40011381ab8e52ee4148b115e27da41061bbf96464f854ecbec93fc82cd9514d",
    timestamp: "2023-05-13T12:31:35.661247Z",
    hash: "0:e98cd3175c5e90530d685dd967ed3924f732d9b7e10f3a87324d0755f9907aee",
    text: "Hello world1",
  },
  {
    sender:
      "0:e98cd3175c5e90530d685dd967ed3924f732d9b7e10f3a87324d0755f9907aee",
    timestamp: "2023-05-14T12:31:35.661247Z",
    hash: "0:e98cd3175c5e90530d685dd967ed3924f732d9b7e10f3a87324d0755f9907aee",
    text: "Hello world2",
  },
  {
    sender:
      "0:e98cd3175c5e90530d685dd967ed3924f732d9b7e10f3a87324d0755f9907aee",
    timestamp: "2023-05-12T12:31:35.661247Z",
    hash: "0:e98cd3175c5e90530d685dd967ed3924f732d9b7e10f3a87324d0755f9907aee",
    text: "Hello worldHello worldHello worldHello worldHello worldHello worldHello world",
  },
  {
    sender:
      "0:40011381ab8e52ee4148b115e27da41061bbf96464f854ecbec93fc82cd9514d",
    timestamp: "2023-05-13T12:31:35.661247Z",
    hash: "0:e98cd3175c5e90530d685dd967ed3924f732d9b7e10f3a87324d0755f9907aee",
    text: "Hello world1",
  },
  {
    sender:
      "0:e98cd3175c5e90530d685dd967ed3924f732d9b7e10f3a87324d0755f9907aee",
    timestamp: "2023-05-14T12:31:35.661247Z",
    hash: "0:e98cd3175c5e90530d685dd967ed3924f732d9b7e10f3a87324d0755f9907aee",
    text: "Hello world2",
  },
  {
    sender:
      "0:e98cd3175c5e90530d685dd967ed3924f732d9b7e10f3a87324d0755f9907aee",
    timestamp: "2023-05-12T12:31:35.661247Z",
    hash: "0:e98cd3175c5e90530d685dd967ed3924f732d9b7e10f3a87324d0755f9907aee",
    text: "Hello worldHello worldHello worldHello worldHello worldHello worldHello world",
  },
  {
    sender:
      "0:40011381ab8e52ee4148b115e27da41061bbf96464f854ecbec93fc82cd9514d",
    timestamp: "2023-05-13T12:31:35.661247Z",
    hash: "0:e98cd3175c5e90530d685dd967ed3924f732d9b7e10f3a87324d0755f9907aee",
    text: "Hello world1",
  },
  {
    sender:
      "0:e98cd3175c5e90530d685dd967ed3924f732d9b7e10f3a87324d0755f9907aee",
    timestamp: "2023-05-14T12:31:35.661247Z",
    hash: "0:e98cd3175c5e90530d685dd967ed3924f732d9b7e10f3a87324d0755f9907aee",
    text: "Hello world2",
  },
  {
    sender:
      "0:e98cd3175c5e90530d685dd967ed3924f732d9b7e10f3a87324d0755f9907aee",
    timestamp: "2023-05-12T12:31:35.661247Z",
    hash: "0:e98cd3175c5e90530d685dd967ed3924f732d9b7e10f3a87324d0755f9907aee",
    text: "Hello worldHello worldHello worldHello worldHello worldHello worldHello world",
  },
  {
    sender:
      "0:40011381ab8e52ee4148b115e27da41061bbf96464f854ecbec93fc82cd9514d",
    timestamp: "2023-05-13T12:31:35.661247Z",
    hash: "0:e98cd3175c5e90530d685dd967ed3924f732d9b7e10f3a87324d0755f9907aee",
    text: "Hello world1",
  },
  {
    sender:
      "0:e98cd3175c5e90530d685dd967ed3924f732d9b7e10f3a87324d0755f9907aee",
    timestamp: "2023-05-14T12:31:35.661247Z",
    hash: "0:e98cd3175c5e90530d685dd967ed3924f732d9b7e10f3a87324d0755f9907aee",
    text: "Hello world2",
  },
  {
    sender:
      "0:e98cd3175c5e90530d685dd967ed3924f732d9b7e10f3a87324d0755f9907aee",
    timestamp: "2023-05-12T12:31:35.661247Z",
    hash: "0:e98cd3175c5e90530d685dd967ed3924f732d9b7e10f3a87324d0755f9907aee",
    text: "Hello worldHello worldHello worldHello worldHello worldHello worldHello world",
  },
  {
    sender:
      "0:40011381ab8e52ee4148b115e27da41061bbf96464f854ecbec93fc82cd9514d",
    timestamp: "2023-05-13T12:31:35.661247Z",
    hash: "0:e98cd3175c5e90530d685dd967ed3924f732d9b7e10f3a87324d0755f9907aee",
    text: "Hello world1",
  },
  {
    sender:
      "0:e98cd3175c5e90530d685dd967ed3924f732d9b7e10f3a87324d0755f9907aee",
    timestamp: "2023-05-14T12:31:35.661247Z",
    hash: "0:e98cd3175c5e90530d685dd967ed3924f732d9b7e10f3a87324d0755f9907aee",
    text: "Hello world2",
  },
];

const Wrapper = styled.div`
  padding: 0px 32px;
  padding-top: 20px;
  height: 100%;
  overflow-y: scroll;
`;

export const MessageList = () => {
  return (
    <Wrapper>
      {messages.map((message, index) => (
        <MessageItem key={index} {...message} />
      ))}
    </Wrapper>
  );
};
