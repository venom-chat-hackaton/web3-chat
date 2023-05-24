import { Address } from "locklift";

async function main() {
  const signer = (await locklift.keystore.getSigner("0"))!;
  const { contract: account, tx } = await locklift.factory.deployContract({
    contract: "Account",
    publicKey: signer.publicKey,
    initParams: {
      _nonce: locklift.utils.getRandomNonce(),
      _socketCode: (await locklift.factory.getContractArtifacts("Socket")).code,
    },
    constructorParams: {
      sendRemainingGasTo: new Address("0:e8335869f7fc7fdf918abae280acb83c0cbfe9bdd680e2581189e4d421d255fd"),
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
