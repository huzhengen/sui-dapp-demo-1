import { ConnectButton, useCurrentAccount, } from "@mysten/dapp-kit";
import { useEffect, useState, useCallback } from "react";
import { queryCoinMetadata, queryFolders, queryObjects, queryProfile, queryState } from "@/lib/contracts";
import { DisplayProfile, State } from "@/type";
import { CreateProfile } from "../CreateProfile";
import { processObject } from "@/lib";
import ProfileCard from "@/components/ProfileCard";

function Main() {
  const [state, setState] = useState<State | null>(null)
  const [hasProfile, setHasProFile] = useState(false)
  const [displayProfile, setDisplayProfile] = useState<DisplayProfile | null>(null);

  const currentUser = useCurrentAccount()

  const fetchState = useCallback(async () => {
    const state = await queryState();
    console.log('state', state);
    const userProfile = state.users.find((user) => user.owner === currentUser?.address)?.profile;
    console.log('userProfile', userProfile);
    if (currentUser && userProfile) {
      // 根据 profile 地址查询 profile
      const profile = await queryProfile(userProfile);
      // 根据当前登录的地址查询
      const objects = await queryObjects(currentUser.address);
      const folders = await queryFolders(profile.folders);
      console.log('folders', folders);

      const processedObjects = processObject(objects);
      console.log('processedObjects', processedObjects);

      // Fetch coin metadata first
      if (processedObjects.Coin) {
        const updatedCoins = await Promise.all(
          processedObjects.Coin.map(async (coin) => {
            const coinMetadata = await queryCoinMetadata(coin.type);
            return {
              ...coin,
              coinMetadata: coinMetadata || undefined
            };
          })
        );
        processedObjects.Coin = updatedCoins;
      }

      setState(state);
      setDisplayProfile({
        ...profile,
        ownerId: currentUser.address,
        folders: folders.map((folder) => ({
          id: folder.id,
          name: folder.name,
          description: folder.description
        })),
        assets: processedObjects
      });
    }

  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      console.log('currentUser', currentUser);
      fetchState();
    }
  }, [currentUser]);


  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-8 flex gap-4">
        <div className="flex flex-col gap-4 border-2 border-gray-200 p-4 rounded-md w-2/3">
          <div className="flex items-center justify-between bg-gray-200 p-4 rounded-md gap-4 font-bold">
            <h1>Owner</h1>
            <p>Profile</p>
          </div>
          {state?.users.map((user) => {
            return <div key={user.owner} className="flex items-center justify-between rounded-md ">
              <h1 className="w-[49%] bg-gray-100 p-2">{user.owner}</h1>
              <p className="w-[49%] bg-gray-100 p-2">{user.profile}</p>
            </div>
          })}
        </div>
        {currentUser && displayProfile
          ?
          <ProfileCard profile={displayProfile} />
          :
          <main className="container mx-auto px-4 py-8">
            <CreateProfile currentUser={currentUser} state={state} />
          </main>
        }
      </main>
    </div>
  );
}

export default Main;
