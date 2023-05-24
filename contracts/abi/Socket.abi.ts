export const abi = {
  "ABI version": 2,
  version: "2.2",
  header: ["pubkey", "time", "expire"],
  functions: [
    {
      name: "constructor",
      inputs: [{ name: "sendRemainingGasTo", type: "address" }],
      outputs: [],
    },
    {
      name: "openSocket",
      inputs: [],
      outputs: [],
    },
    {
      name: "closeSocket",
      inputs: [],
      outputs: [],
    },
    {
      name: "sendMessage",
      inputs: [{ name: "message", type: "string" }],
      outputs: [],
    },
  ],
  data: [
    { key: 1, name: "_rootAccount", type: "address" },
    { key: 2, name: "_owner", type: "address" },
  ],
  events: [
    {
      name: "NewMessage",
      inputs: [{ name: "msg", type: "string" }],
      outputs: [],
    },
  ],
  fields: [
    { name: "_pubkey", type: "uint256" },
    { name: "_timestamp", type: "uint64" },
    { name: "_constructorFlag", type: "bool" },
    { name: "_rootAccount", type: "address" },
    { name: "_owner", type: "address" },
    { name: "_socketOpened", type: "bool" },
  ],
} as const;
