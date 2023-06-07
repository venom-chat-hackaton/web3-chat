pragma ever-solidity >= 0.61.2;
pragma AbiHeader expire;
pragma AbiHeader pubkey;

contract User {
    address static _rootAccount;
    address static _owner;

    uint256 constant p = 23; // prime number
    uint256 constant g = 5;  // primitive root modulo
    uint256 constant k = 250; // (g^k) < 2^256 => 5^k < (2*2)^255 => (5^k) < (2*2*2)^254. thus k must be < 254
    uint256 private privKey;
    uint256 public pubKey;
    constructor(address sendRemainingGasTo) public {
        // we are reserving another 0.1 here for paying for future external call
        // all another reserves will be on 0.1 only
        tvm.rawReserve(0.1 ever + 0.1 ever, 0);
        if (msg.sender != _rootAccount) {
            selfdestruct(msg.sender);
        }
        //shuffle the random seed generator
        rnd.shuffle(); //we can randomize it further by inputting msg.sender as input to rnd.shuffle
        privKey = rnd.next(k);
        pubKey = (g ** privKey) % p; // (g^a) mod P

        sendRemainingGasTo.transfer({ value: 0, flag: 128, bounce: false });
    }

    function getSharedSecret(uint256 peerPubKey) external view returns (uint256)
    {
       require(msg.sender == _owner, 201);
       tvm.rawReserve(0.1 ever, 0);
       return (peerPubKey ** privKey) % p; // (g^a*b) mod P
    }
    function getPublicKey() external view returns (uint256)
    {
        return pubKey;
    }
}