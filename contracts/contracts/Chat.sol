pragma ever-solidity >= 0.61.2;
pragma AbiHeader expire;
pragma AbiHeader pubkey;

contract Chat {
    event NewMessage(string fromAddress, string toAddress, string msg);
    address static _rootAccount;
    address static _peer1;
    address static _peer2;

    constructor() public {
        // we are reserving 2 ever here for paying for future external call
        tvm.rawReserve(2 ever, 0);
        if (msg.sender != _rootAccount) {
            selfdestruct(msg.sender);
        }
    }

    function sendMessage(string from, string dest, string message) external {
        tvm.accept();
        //send external outbound message a.k.a events
        emit NewMessage(from, dest, message);
    }

}