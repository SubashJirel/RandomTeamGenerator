import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PlayerForm from "./components/player/PlayerForm";
import PlayerList from "./components/player/PlayerList";
import Navbar from "./components/Navbar";
import TeamGenerator from "./components/team/TeamGenerator";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Navigate to="/players" />} />
              <Route path="/players" element={<PlayerList />} />
              <Route path="/players/new" element={<PlayerForm />} />
              <Route path="/players/:groupId" element={<PlayerList />} />
              <Route path="/generate/:groupId" element={<TeamGenerator />} />
            </Routes>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
