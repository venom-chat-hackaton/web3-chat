const locklift = require('locklift');
const Address = locklift.Address;

async function main() {
  // const signer = await locklift.keystore.getSigner("0");
  const { contract: account, tx } = await locklift.factory.deployContract({
    contract: "Factory",
    publicKey: 'b023514c19209fb2b5391bd29ca6fc4ae6a1791e0af5060801c80b95e9207da3',
    initParams: {
      _nonce: locklift.utils.getRandomNonce(),
      _userCode: (await locklift.factory.getContractArtifacts("User")).code,
      _chatCode: (await locklift.factory.getContractArtifacts("Chat")).code,
    },
    constructorParams: {
      sendRemainingGasTo: new Address("0:93c7fb1a7ed7eb84de637b4b5b44bf98e6c13521619a150e2df2d6250af3cfc9"),
    },
    value: locklift.utils.toNano(3),
  });

  console.log(`Account deployed at: ${account.address.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
