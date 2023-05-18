import { ProviderRpcClient } from "everscale-inpage-provider";
import { EverscaleStandaloneClient } from "everscale-standalone-client";
import { VenomConnect } from "venom-connect";
import { Theme } from "./Theme";

const standaloneFallback = () =>
  EverscaleStandaloneClient.create({
    connection: {
      id: 1002,
      group: "venom_devnet",
      type: "jrpc",
      data: {
        endpoint: "https://jrpc-devnet.venom.foundation/",
      },
    },
  });

export const initVenomConnect = async (theme?: Theme) => {
  return new VenomConnect({
    theme,
    checkNetworkId: 1002,
    providersOptions: {
      venomwallet: {
        walletWaysToConnect: [
          {
            package: ProviderRpcClient,
            packageOptions: {
              fallback:
                VenomConnect.getPromise("venomwallet", "extension") ||
                (() => Promise.reject()),
              forceUseFallback: true,
            },
            packageOptionsStandalone: {
              fallback: standaloneFallback,
              forceUseFallback: true,
            },

            id: "extension",
            type: "extension",
          },
        ],
      },
    },
  });
};
