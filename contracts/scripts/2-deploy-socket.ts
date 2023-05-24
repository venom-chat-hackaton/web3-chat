import { Address } from "locklift";
import { getClient, getClient2, getAccountContract } from "../src/subscribe";
import { readFileSync } from "fs";
import { resolve } from "path";

import { SimpleAccountsStorage, WalletV3Account } from "everscale-standalone-client";

async function main() {
  try {
    const client = await getClient2();
    const accountAddress = "0:b4acf1de005d5dc1f4cdefb0e3bc5cb50eb6f26af30c886e28fc74a26417bf23";
    const walletAddress = "0:e8335869f7fc7fdf918abae280acb83c0cbfe9bdd680e2581189e4d421d255fd";
    const accountContract = getAccountContract(client, accountAddress);
    // Here will be the main call
    const response = await accountContract.methods
      .deploySocket({
        sendRemainingGasTo: new Address(accountAddress),
      })
      .sendWithResult({
        amount: "500000000", // how much value will be attached
        from: new Address("0:1aef7e5f5e1e85d1cdfba8a49b19373c9f1893bc077ae51239a8726356d865d0"), // just like that! It will be an internal message from your wallet!
        bounce: true,
      });
    console.log(response);

    //const accountContractAbi = JSON.parse(readFileSync(resolve(process.cwd(), "../abi/Account.abi.json"), "utf-8"));
    //const decodedResult = await client.rawApi.decodeTransactionEvents({
    //  abi: JSON.stringify(accountContractAbi),
    //  transaction: response.childTransaction as any,
    //});
    //if (!decodedResult.events.length) {
    if (response != null) {
      console.log("okay");
      return undefined;
    }
  } catch (error) {
    console.log(`Deploy ballot error`, (error as any).stack);
    return undefined;
  }
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
