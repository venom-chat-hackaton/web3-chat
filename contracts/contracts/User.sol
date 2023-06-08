pragma ever-solidity >= 0.61.2;
pragma AbiHeader expire;
pragma AbiHeader pubkey;

struct PrivateKeyData {
    string encryptedPrivateKey;
    string privateKeyNonce;
}

contract User {
    address static _rootAccount;
    address static _owner;
    string private static _encryptedPrivateKey;
    string private static _privateKeyNonce;
    string public static _publicKey;

    constructor(address sendRemainingGasTo) public {
        tvm.accept();
        tvm.rawReserve(0.1 ever + 0.1 ever, 0);
        if (msg.sender != _rootAccount) {
            selfdestruct(msg.sender);
        }

        sendRemainingGasTo.transfer({ value: 0, flag: 128, bounce: false });
    }

    function getEncryptedPrivateKeyData() external view returns (PrivateKeyData)
    {
        return PrivateKeyData(_encryptedPrivateKey, _privateKeyNonce);
    }

    function getPublicKey() public view returns (string)
    {
        tvm.accept();
        return _publicKey;
    }
}