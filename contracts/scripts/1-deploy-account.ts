import { Address } from "locklift";

async function main() {
  const signer = (await locklift.keystore.getSigner("0"))!;
  const { contract: account, tx } = await locklift.factory.deployContract({
    contract: "Factory",
    publicKey: signer.publicKey,
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
