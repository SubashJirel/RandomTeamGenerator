import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PlayerForm from "./components/player/PlayerForm";
import PlayerList from "./components/player/PlayerList";
import TeamList from "./components/team/TeamList";
import Navbar from "./components/Navbar";
import TeamGenerator from "./components/team/TeamGenerator";
import TeamView from "./components/team/TeamView";

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
              <Route path="/teams" element={<TeamList />} />
              <Route path="/generate/:groupId" element={<TeamGenerator />} />
              <Route path="/teams/:publicId" element={<TeamView />} />
            </Routes>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
