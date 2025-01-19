import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { createNetworkConfig } from "@mysten/dapp-kit";
import { SuiGraphQLClient } from "@mysten/sui/graphql";

const { networkConfig, useNetworkVariable, useNetworkVariables } =
  createNetworkConfig({
    devnet: {
      url: getFullnodeUrl("devnet"),
    },
    testnet: {
      url: getFullnodeUrl("testnet"),
      // week1
      // packageID: "0xe779c13bdddd16241896f15fc56bfa448d6e661b63df5e46be6ef31a063645e4",
      // state: "0xa17ffd9916089dde4fae2e0b24a29ff858a7af787e635ccb7ed77bed5180ad6d",
      // week2
      // packageID: "0x3cba1f04cd295907b4870d703e7a715bdb426b15e7e4925e9edfec06ab51ce62",
      // state: "0x6ee75f9e8cbfd410b662c69c6131d38c02397b8365810a018fc5ebab91ed6e1d",
      // module: 'week_two',
      // week3 
      packageID: "0x00732ff25592c0175ae9a7413017bea39cf0c24ebdaf5978d0e0641b374b74cc",
      state: "0x1d86ac608f6efaaa0eb9d44313adc2d4af9459975ef8151d14ff1b705dac0d1e",
      module: 'week3',
    },
    mainnet: {
      url: getFullnodeUrl("mainnet"),
    },
  });

const suiClient = new SuiClient({
  url: networkConfig.testnet.url,
});

const suiGraphQLClient = new SuiGraphQLClient({
  url: `https://sui-testnet.mystenlabs.com/graphql`,
});

export { useNetworkVariable, useNetworkVariables, networkConfig, suiClient, suiGraphQLClient };
