import { ConnectButton } from "@mysten/dapp-kit";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Main from "./pages/Main";
import User from "./pages/User";
// import NaviBar from "./components/navi-bar";

function App() {
  return (
    <Router>
      <div className="bg-background">
        <header className="border-b">
          <div className="container mx-auto px-4">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center font-bold text-xl">
                <h1>Logo</h1>
                <div className="text-base pl-4"><Link to="/">Home</Link></div>
              </div>
              <ConnectButton />
            </div>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
