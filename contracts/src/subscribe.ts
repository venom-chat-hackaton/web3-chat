import { Address, Contract, ProviderRpcClient, Subscriber } from "everscale-inpage-provider";
import { EverscaleStandaloneClient, SimpleKeystore } from "everscale-standalone-client/nodejs";
import { SimpleAccountsStorage, WalletV3Account } from "everscale-standalone-client";
import { readFileSync } from "fs";
import { resolve } from "path";

// importing an ABI here
import { abi as accountContractAbi } from "../abi/Account.abi";
import { abi as socketContractAbi } from "../abi/Socket.abi";

// Key pair to interact with Socket contract
const socketActivationSignerKeys = {
  // suppose we have this variables in system environment...you can use dotenv for example
  public: "7e5f6295267552b38f05f5c81a34c67f7a0a7c8cfb138bd7b7aa957fda6dc61d",
  secret: "7fa935435fc0639477243ad5ec6059a02bd93c0b17f929b2ae9277eca49538c7",
};

// function for creating a standalone client
// (of course you have to create some singleton for that)
export async function getClient(): Promise<ProviderRpcClient> {
  const client = new ProviderRpcClient({
    fallback: () =>
      EverscaleStandaloneClient.create({
        connection: {
          id: 1000,
          group: "dev",
          type: "jrpc",
          data: {
            endpoint: "https://jrpc-devnet.venom.foundation/",
          },
        },
        // Manually creating a keystore for our client, because we haven't wallet extension here...we are not in browser
        keystore: new SimpleKeystore({
          [socketActivationSignerKeys.public]: {
            publicKey: socketActivationSignerKeys.public,
            secretKey: socketActivationSignerKeys.secret,
          },
        }),
      }),
  });
  await client.ensureInitialized();
  await client.requestPermissions({ permissions: ["basic"] });
  return client;
}

export async function getClient2(): Promise<ProviderRpcClient> {
  // initializing accounts storage
  // SimpleAccountsStorage is a class from everscale-standalone-client
  const accountsStorage = new SimpleAccountsStorage();
  // import WalletV3Account from everscale-standalone-client and provide an public key from somewhere
  const account = await WalletV3Account.fromPubkey({
    publicKey: "7e5f6295267552b38f05f5c81a34c67f7a0a7c8cfb138bd7b7aa957fda6dc61d",
  });
  // put our walletv3 to storage
  accountsStorage.addAccount(account);
  accountsStorage.defaultAccount = account.address;

  //console.log("\n\n\naccount.address = ", account.address);

  const client = new ProviderRpcClient({
    fallback: () =>
      EverscaleStandaloneClient.create({
        connection: {
          id: 1000,
          group: "dev",
          type: "jrpc",
          data: {
            endpoint: "https://jrpc-devnet.venom.foundation/",
          },
        },
        accountsStorage, // provide our accounts storage here!
        // Of course we need a keystore here! And keys exactly from our wallet!
        keystore: new SimpleKeystore({
          ["0:e8335869f7fc7fdf918abae280acb83c0cbfe9bdd680e2581189e4d421d255fd"]: {
            publicKey: "7e5f6295267552b38f05f5c81a34c67f7a0a7c8cfb138bd7b7aa957fda6dc61d",
            secretKey: "7fa935435fc0639477243ad5ec6059a02bd93c0b17f929b2ae9277eca49538c7",
          },
        }),
      }),
  });
  await client.ensureInitialized();
  await client.requestPermissions({ permissions: ["basic"] });
  return client;
}

export function getAccountContract(
  client: ProviderRpcClient,
  accountAddress: string,
): Contract<typeof accountContractAbi> {
  const contractAbi = JSON.parse(readFileSync(resolve(process.cwd(), "abi/Account.abi.json"), "utf-8"));
  return new client.Contract(contractAbi, new Address(accountAddress!));
}

// Just a little helper. Returns a Vote contract instance.
export function getSocketContract(
  client: ProviderRpcClient,
  socketAddress: string,
): Contract<typeof socketContractAbi> {
  const contractAbi = JSON.parse(readFileSync(resolve(process.cwd(), "abi/Socket.abi.json"), "utf-8"));
  return new client.Contract(contractAbi, new Address(socketAddress!));
}

// Socket message listener
export async function listenNewMessage() {
  const client = await getClient();
  const socketContract = getSocketContract(client, "");

  const subscriber = new Subscriber(client);
  socketContract
    .events(subscriber)
    .filter(event => event.event === "NewMessage")
    .on(async event => {
      // here is our event
      const eventData = {
        message: event.data.msg.toString(),
      };
      console.log(eventData.message);
      // here we will implement a saving to database
    });
}
