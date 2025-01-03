import { ConnectButton, useSignAndExecuteTransaction, useCurrentAccount, } from "@mysten/dapp-kit";
import { WalletStatus } from "./WalletStatus";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { queryState, queryStateByEvents, createProfile, } from "@/lib/contracts";
import { State } from "./type";
import { CreateProfile } from "./CreateProfile";


function App() {
 
  const [state, setState] = useState<State | null>(null)
  const [hasProfile, setHasProFile] = useState(false)
  const { mutate: signAndExecute } = useSignAndExecuteTransaction()
  const currentAccount = useCurrentAccount()

  const fetchState = async () => {
    const state = await queryStateByEvents();
    console.log(state, currentAccount);
    setState(state);
    if (state.users.find(user => user.owner === currentAccount?.address)) {
      console.log('user found');
      setHasProFile(true)
    }
  };

  useEffect(() => {
    if (currentAccount) {
      fetchState();
    }
  }, [currentAccount]);

  return (
    <>
      <header className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="font-bold text-xl">Logo</div>
            <ConnectButton />
          </div>
        </div>
      </header>
      {currentAccount && hasProfile
        ?
        <div className="container mx-auto">
          <WalletStatus />
        </div>
        :
        <main className="container mx-auto px-4 py-8">
          <CreateProfile currentAccount={currentAccount} state={state} />
        </main>
      }


    </>
  );
}

export default App;
