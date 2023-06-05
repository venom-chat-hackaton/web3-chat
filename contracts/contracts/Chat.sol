pragma ever-solidity >= 0.61.2;
pragma AbiHeader expire;
pragma AbiHeader pubkey;

contract Chat {
    event NewMessage(string fromAddress, string toAddress, string msg);
    address static _initiator;
    address static _recipient;

    constructor(address sendRemainingGasTo) public {
        tvm.rawReserve(0.1 ever + 0.1 ever, 0);
        if (msg.sender != _initiator) {
            selfdestruct(msg.sender);
        }
        sendRemainingGasTo.transfer({ value: 0, flag: 128, bounce: false });
    }

    function sendMessage(string from, string dest, string message) external {
        // Add require check for from / dest to be _initiator / _recipient
        tvm.rawReserve(0.1 ever, 0);
        emit NewMessage(from, dest, message);
    }
}