pragma ever-solidity >= 0.61.2;
pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "./Chat.sol";

contract Socket {
    address static _rootAccount;
    address static _owner;
    mapping(address => address) chats;

    constructor(address sendRemainingGasTo) public {
        tvm.rawReserve(0.1 ever + 0.1 ever, 0); // Should we use this rawReverse everywhere?
        if (msg.sender != _rootAccount) {
            selfdestruct(msg.sender);
        }
        sendRemainingGasTo.transfer({ value: 0, flag: 128, bounce: false });
    }

    function deployChat(address sendRemainingGasTo, address recipientSocketAddress, address recipientAddress, string initialMessage) external {
        tvm.rawReserve(0.1 ever, 0);
        TvmCell chatStateInit = tvm.buildStateInit({
            contr: Chat,
            varInit: {
                _initiator: _owner,
                _recipient: recipientAddress
            },
            code: _rootAccount // What should we pass here?
        });

        address chatAddress = address(tvm.hash(chatStateInit));
        chats[recipientAddress] = chatAddress;
        new Chat{
            stateInit: chatStateInit,
            value: 0,
            flag: 128
        }(
            sendRemainingGasTo
        ); 
        Socket(recipientSocketAddress).setChat(_owner, chatAddress); // Pass recipientSocketAddress and move to Chat constructor?
        Chat(chatAddress).sendMessage(_owner, recipientAddress, initialMessage) // Move to Chat constructor?
    }

    function getChats() external view returns (mapping(address => address)) {
        return chats;
    }

    function setChat(address recipientAddress, address chatAddress) {
        chats[recipientAddress] = chatAddress;
    }

    function getSharedSecret() external view returns (string) {
        // Black box functionality?
    }

    function getPublicKey() external view returns (string) {
        // Black box functionality?
    }
}