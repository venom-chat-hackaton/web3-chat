pragma ever-solidity >= 0.61.2;
pragma AbiHeader expire;
pragma AbiHeader pubkey;

contract Chat {
    event NewMessage(address sender, address recipient, string encryptedMessage, string nonce);
    address static _rootAccount;
    address static _peer1;
    address static _peer2;

    constructor(address sendRemainingGasTo) public {
        // we are reserving 2 ever here for paying for future external call
        tvm.rawReserve(2 ever, 0);
        if (msg.sender != _rootAccount) {
            selfdestruct(msg.sender);
        }

        sendRemainingGasTo.transfer({ value: 0, flag: 128, bounce: false });
    }

    function sendMessage(address sender, address recipient, string encryptedMessage, string nonce) external pure {
        tvm.accept();
        //send external outbound message a.k.a events
        emit NewMessage(sender, recipient, encryptedMessage, nonce);
    }
}