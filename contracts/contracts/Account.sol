pragma ever-solidity >= 0.61.2;
pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "./Socket.sol";

contract Account {
    uint16  static _nonce;
    TvmCell static _socketCode;
    mapping(address => address) socketAddress; 

    constructor(
        address sendRemainingGasTo
    ) public {
        tvm.accept();
        tvm.rawReserve(0.1 ever, 0);
        sendRemainingGasTo.transfer({ value: 0, flag: 128, bounce: false });
    }

    function deploySocket(address sendRemainingGasTo) external {
        tvm.rawReserve(0.1 ever, 0);
        TvmCell socketStateInit = tvm.buildStateInit({
            contr: Socket,
            varInit: {
                _rootAccount: address(this),
                _owner: msg.sender
            },
            code: _socketCode
        });
        
        socketAddress[msg.sender] = address(tvm.hash(socketStateInit));
        new Socket{
            stateInit: socketStateInit,
            value: 0,
            flag: 128
        }(
            sendRemainingGasTo
        ); 
    }

    function getSocketAddress(address owner) external view returns (address) {
        return socketAddress[owner];
    }
}