export const abi = {
  "ABI version": 2,
  version: "2.2",
  header: [
    "pubkey",
    "time",
    "expire"
  ],
  functions: [
    {
      name: "constructor",
      inputs: [
        {
          name: "sendRemainingGasTo",
          type: "address"
        }
      ],
      outputs: []
    },
    {
      name: "deployUser",
      inputs: [
        {
          name: "sendRemainingGasTo",
          type: "address"
        },
        {
          name: "encryptedPrivateKey",
          type: "string"
        },
        {
          name: "publicKey",
          type: "string"
        },
        {
          name: "privateKeyNonce",
          type: "string"
        }
      ],
      outputs: []
    },
    {
      name: "deployChat",
      inputs: [
        {
          name: "peer1",
          type: "address"
        },
        {
          name: "peer2",
          type: "address"
        },
        {
          name: "sendRemainingGasTo",
          type: "address"
        },
        {
          name: "initialEncryptedMessage",
          type: "string"
        },
        {
          name: "initialMessageNonce",
          type: "string"
        }
      ],
      outputs: []
    },
    {
      name: "getSocketAddress",
      inputs: [
        {
          name: "owner",
          type: "address"
        }
      ],
      outputs: [
        {
          name: "value0",
          type: "address"
        }
      ]
    },
    {
      name: "getChatAddress",
      inputs: [
        {
          name: "peer1",
          type: "address"
        },
        {
          name: "peer2",
          type: "address"
        }
      ],
      outputs: [
        {
          name: "value0",
          type: "address"
        }
      ]
    },
    {
      name: "getChats",
      inputs: [
        {
          name: "peer",
          type: "address"
        }
      ],
      outputs: [
        {
          name: "value0",
          type: "map(address,address)"
        }
      ]
    }
  ],
  data: [
    {
      key: 1,
      name: "_nonce",
      type: "uint16"
    },
    {
      key: 2,
      name: "_userCode",
      type: "cell"
    },
    {
      key: 3,
      name: "_chatCode",
      type: "cell"
    }
  ],
  events: [
    {
      name: "NewChat",
      inputs: [
        {
          name: "peer1",
          type: "address"
        },
        {
          name: "peer2",
          type: "address"
        },
        {
          name: "newChatAddress",
          type: "address"
        }
      ],
      outputs: []
    }
  ],
  fields: [
    {
      name: "_pubkey",
      type: "uint256"
    },
    {
      name: "_timestamp",
      type: "uint64"
    },
    {
      name: "_constructorFlag",
      type: "bool"
    },
    {
      name: "_nonce",
      type: "uint16"
    },
    {
      name: "_userCode",
      type: "cell"
    },
    {
      name: "_chatCode",
      type: "cell"
    },
    {
      name: "userAddress",
      type: "map(address,address)"
    },
    {
      name: "chatAddress",
      type: "map(address,map(address,address))"
    }
  ]
} as const;
