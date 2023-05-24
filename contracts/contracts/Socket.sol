pragma ever-solidity >= 0.61.2;
pragma AbiHeader expire;
pragma AbiHeader pubkey;

contract Socket {
    event NewMessage(string msg);
    address static _rootAccount;
    //uint256 static _walletPublicKey;
    // we have a static for owner...so our logic would be like "allow this address to vote"
    // we can store a static here for ballot number, and our logic would been "allow that ballot to vote"
    address static _owner;

    bool _socketOpened; // socket connection is open

    constructor(address sendRemainingGasTo) public {
        // we are reserving another 0.1 here for paying for future external call
        // all another reserves will be on 0.1 only
        tvm.rawReserve(0.1 ever + 0.1 ever, 0);
        if (msg.sender != _rootAccount) {
            selfdestruct(msg.sender);
        }
        _socketOpened = false;
        sendRemainingGasTo.transfer({ value: 0, flag: 128, bounce: false });
    }

    // this function will be called by external message, so contract will pay for this call
    // this mechanic exists for moving commision paying to user responsibility
    // in constructor we reserver a little more venoms, so here we just will use them (with returning remains)
    // useful mechaninc for your dapp
    function openSocket() external {
        require(msg.sender == _owner, 201);
        tvm.accept(); // allow to use contract balance for paying this function execution
        _socketOpened = true;
        tvm.rawReserve(0.1 ever, 0);
        _owner.transfer({ value: 0, flag: 128, bounce: false });
    }

    function closeSocket() external {
        require(msg.sender == _owner, 201);
        tvm.accept(); // allow to use contract balance for paying this function execution
        _socketOpened = false;
        tvm.rawReserve(0.1 ever, 0);
        _owner.transfer({ value: 0, flag: 128, bounce: false });
    }

    function sendMessage(string message) external {
        require(msg.sender == _owner, 201);
        require(_socketOpened, 202);
        tvm.rawReserve(0.1 ever, 0);
        //send external outbound message a.k.a events
        emit NewMessage(message);
    }

}