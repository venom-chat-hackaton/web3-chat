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
      name: "deploySocket",
      inputs: [{ name: "sendRemainingGasTo", type: "address" }],
      outputs: [],
    },
  ],
  data: [
    { key: 1, name: "_nonce", type: "uint16" },
    { key: 2, name: "_socketCode", type: "cell" },
  ],
  events: [],
  fields: [
    { name: "_pubkey", type: "uint256" },
    { name: "_timestamp", type: "uint64" },
    { name: "_constructorFlag", type: "bool" },
    { name: "_nonce", type: "uint16" },
    { name: "_socketCode", type: "cell" },
  ],
} as const;
