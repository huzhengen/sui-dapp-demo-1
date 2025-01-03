import { useState } from "react";
import { Button } from "./components/ui/button";
import { queryState, queryStateByEvents, createProfile, } from "@/lib/contracts";
import { ConnectButton, useSignAndExecuteTransaction, useCurrentAccount } from "@mysten/dapp-kit";
import { State } from "./type/index"
import type { WalletAccount } from '@mysten/wallet-standard';



export function CreateProfile({ currentAccount, state }: { currentAccount: WalletAccount | null, state: State | null }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const { mutate: signAndExecute } = useSignAndExecuteTransaction()


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(name, description)
    const tx = await createProfile(name, description);
    signAndExecute({
      transaction: tx,
    }, {
      onSuccess: (info) => {
        console.log('success', info);
      },
      onError: (e) => {
        console.log('error', e);
      }
    })
  }

  if (!currentAccount) {
    return <div>Connect your wallet to create a profile</div>
  }

  if (!state) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-md mx-auto">
      <form className="space-y-6 bg-white p-8 rounded-lg shadow-md"
        onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Enter your name"
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Description
          </label>
          <textarea
            id="description"
            className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Enter your description"
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  )
}