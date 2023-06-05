pragma ever-solidity >= 0.61.2;
pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "./User.sol";
import "./Chat.sol";

contract Factory {
    uint16  static _nonce;
    TvmCell static _userCode;
    TvmCell static _chatCode;
    mapping(address => address) userAddress; //Venom Wallet address -> User Address mapped
    mapping(address => mapping(address => address)) chatAddress;
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

    function deployUser(address sendRemainingGasTo) external {
        tvm.rawReserve(0.1 ever, 0);
        TvmCell userStateInit = tvm.buildStateInit({
            contr: User,
            varInit: {
                _rootAccount: address(this),
                //_managerPublicKey: msg.pubkey(),
                _owner: msg.sender
            },
            code: _userCode
        });
        // address is a hash from state init
        userAddress[msg.sender] = address(tvm.hash(userStateInit));
        new User{
            stateInit: userStateInit,
            value: 0,
            flag: 128
        }(
            sendRemainingGasTo
        ); 
    }

    function deployChat(address peer1, address peer2) external {

        require(chatAddress[peer1][peer2] == address(0), 203);
        require(chatAddress[peer2][peer1] == address(0), 203);

        tvm.rawReserve(0.1 ever, 0);
        TvmCell chatStateInit = tvm.buildStateInit({
            contr: Chat,
            varInit: {
                _rootAccount: address(this),
                _peer1: peer1,
                _peer2: peer2
            },
            code: _chatCode
        });
        // address is a hash from state init
        chatAddress[peer1][peer2] = address(tvm.hash(chatStateInit));
        chatAddress[peer2][peer1] = chatAddress[peer1][peer2];

        new Chat{
            stateInit: chatStateInit,
            value: 0,
            flag: 128
        }(); 
    }

    function getSocketAddress(address owner) external view returns (address) {
        return userAddress[owner];
    }

    function getChatAddress(address peer1, address peer2) external view returns (address) {
        return chatAddress[peer1][peer2];
    }
}