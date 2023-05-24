pragma ever-solidity >= 0.61.2;
pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "./Socket.sol";

contract Account {
    uint16  static _nonce;
    TvmCell static _socketCode;

    //uint256 _managerPublicKey;

    constructor(
        //uint256 managerPublicKey,
        address sendRemainingGasTo
    ) public {
        tvm.accept();
        tvm.rawReserve(0.1 ever, 0);
        //_managerPublicKey = managerPublicKey;
        sendRemainingGasTo.transfer({ value: 0, flag: 128, bounce: false });
    }

    function deploySocket(address sendRemainingGasTo) external view {
        tvm.rawReserve(0.1 ever, 0);
        TvmCell socketStateInit = tvm.buildStateInit({
            contr: Socket,
            varInit: {
                _rootAccount: address(this),
                //_managerPublicKey: msg.pubkey(),
                _owner: msg.sender
            },
            code: _socketCode
        });
        new Socket{
            stateInit: socketStateInit,
            value: 0,
            flag: 128
        }(
            sendRemainingGasTo
        ); 
    }
}