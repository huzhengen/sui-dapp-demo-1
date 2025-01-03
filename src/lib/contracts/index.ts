import { networkConfig, suiClient } from "@/networkConfig";
import { State, User } from "@/type";
import { Transaction } from "@mysten/sui/transactions";

export const queryStateByEvents = async () => {
  const events = await suiClient.queryEvents({
    query: {
      MoveEventType: `${networkConfig.testnet.packageID}::week_one_alt::ProfileCreated`,
    },
  });
  const state: State = {
    users: [],
  };

  events.data.forEach((event) => {
    const user = event.parsedJson as User;
    state.users.push(user);
  });
  return state;
};

export const queryState = async () => {
  const state = await suiClient.getObject({
    id: networkConfig.testnet.state,
    options: {
      showContent: true,
    },
  });
  return state;
};

export const createProfile = async (name:string,description:string) => {
 const tx = new Transaction()

 tx.moveCall({
  package:networkConfig.testnet.packageID,
  module:'week_one_alt',
  function:`create_profile`,
  arguments:[
    tx.pure.string(name),
    tx.pure.string(description),
    tx.object(networkConfig.testnet.state),
  ],
 })

 return tx
};
