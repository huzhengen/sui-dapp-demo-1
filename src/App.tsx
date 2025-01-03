import { ConnectButton } from "@mysten/dapp-kit";
import { WalletStatus } from "./WalletStatus";
import { Button } from "@/components/ui/button";

function App() {
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
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <form className="space-y-6 bg-white p-8 rounded-lg shadow-md">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter your name"
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
              />
            </div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </div>
      </main>
      <div className="container mx-auto px-4 py-8">
        <div className="rounded-md border">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr className="border-b transition-colors">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Description</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Author</th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b transition-colors hover:bg-muted/50">
                <td className="p-4 align-middle">Project Name</td>
                <td className="p-4 align-middle">This is a sample description for the project</td>
                <td className="p-4 align-middle font-mono">
                  <span className="text-sm">
                    {/* Example of truncated address */}
                    0x1234...5678
                  </span>
                </td>
                <td className="p-4 text-right align-middle">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </td>
              </tr>
              <tr className="border-b transition-colors hover:bg-muted/50">
                <td className="p-4 align-middle">Another Project</td>
                <td className="p-4 align-middle">Another sample description here</td>
                <td className="p-4 align-middle font-mono">
                  <span className="text-sm">
                    0x9abc...def0
                  </span>
                </td>
                <td className="p-4 text-right align-middle">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <WalletStatus />

    </>
  );
}

export default App;
