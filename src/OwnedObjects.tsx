import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";
import { Flex, Heading, Text } from "@radix-ui/themes";
import { Button } from "./components/ui/button";

export function OwnedObjects() {
  const account = useCurrentAccount();
  const { data, isPending, error } = useSuiClientQuery(
    "getOwnedObjects",
    {
      owner: account?.address as string,
    },
    {
      enabled: !!account,
    },
  );

  if (!account) {
    return;
  }

  if (error) {
    return <Flex>Error: {error.message}</Flex>;
  }

  if (isPending || !data) {
    return <Flex>Loading...</Flex>;
  }
  console.log('objects', data.data);


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="rounded-md border">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr className="border-b transition-colors">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Object ID</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((object, index) => (
              <tr className="border-b transition-colors hover:bg-muted/50" key={index}>
                <td className="p-4 align-middle">{index}</td>
                <td className="p-4 align-middle">{object.data?.objectId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
