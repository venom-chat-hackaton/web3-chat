export const abi = {
  "ABI version": 2,
  version: "2.2",
  header: ["pubkey", "time", "expire"],
  functions: [
    {
      name: "constructor",
      inputs: [
        {
          name: "sendRemainingGasTo",
          type: "address",
        },
      ],
      outputs: [],
    },
    {
      name: "sendMessage",
      inputs: [
        {
          name: "sender",
          type: "address",
        },
        {
          name: "recipient",
          type: "address",
        },
        {
          name: "encryptedMessage",
          type: "string",
        },
        {
          name: "nonce",
          type: "string",
        },
      ],
      outputs: [],
    },
  ],
  data: [
    {
      key: 1,
      name: "_rootAccount",
      type: "address",
    },
    {
      key: 2,
      name: "_peer1",
      type: "address",
    },
    {
      key: 3,
      name: "_peer2",
      type: "address",
    },
  ],
  events: [
    {
      name: "NewMessage",
      inputs: [
        {
          name: "sender",
          type: "address",
        },
        {
          name: "recipient",
          type: "address",
        },
        {
          name: "encryptedMessage",
          type: "string",
        },
        {
          name: "nonce",
          type: "string",
        },
      ],
      outputs: [],
    },
  ],
  fields: [
    {
      name: "_pubkey",
      type: "uint256",
    },
    {
      name: "_timestamp",
      type: "uint64",
    },
    {
      name: "_constructorFlag",
      type: "bool",
    },
    {
      name: "_rootAccount",
      type: "address",
    },
    {
      name: "_peer1",
      type: "address",
    },
    {
      name: "_peer2",
      type: "address",
    },
  ],
} as const;
