import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGenerateTeamsFromGroup } from "../../hooks/useGeneratedTeam";
import { getPlayersByGroup } from "../../api/playerApi";
import { useQuery } from "@tanstack/react-query";

function TeamGenerator() {
  const { groupId } = useParams();

  const generateTeamsMutation = useGenerateTeamsFromGroup();

  // Fetch players to show count
  const { data: players, isLoading: playersLoading } = useQuery({
    queryKey: ["players", groupId],
    queryFn: () => getPlayersByGroup(groupId),
  });

  const [numberOfTeams, setNumberOfTeams] = useState(2);
  const [title, setTitle] = useState("Match Day Teams");
  const [generatedTeams, setGeneratedTeams] = useState(null);

  const handleGenerateTeams = async () => {
    try {
      const result = await generateTeamsMutation.mutateAsync({
        groupId,
        numberOfTeams,
        title,
      });

      setGeneratedTeams(result);
    } catch (error) {
      console.error("Error generating teams:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Generate Teams</h2>

      {playersLoading ? (
        <div className="text-center p-4">Loading players...</div>
      ) : (
        <p className="mb-4">
          {players?.length || 0} players available for team creation
        </p>
      )}

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-gray-700 mb-2">Event Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter event title"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Number of Teams</label>
          <input
            type="number"
            min="2"
            max={players?.length || 2}
            value={numberOfTeams}
            onChange={(e) =>
              setNumberOfTeams(Math.max(2, parseInt(e.target.value) || 2))
            }
            className="w-32 p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <button
        onClick={handleGenerateTeams}
        disabled={generateTeamsMutation.isPending || !players?.length}
        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400 mb-6"
      >
        {generateTeamsMutation.isPending ? "Generating..." : "Generate Teams"}
      </button>

      {generateTeamsMutation.isError && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md mb-6">
          {generateTeamsMutation.error?.message || "Failed to generate teams"}
        </div>
      )}

      {generatedTeams && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">{generatedTeams.title}</h3>
            {generatedTeams.publicLink && (
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">Public Link:</span>
                <code className="bg-gray-100 p-1 rounded text-sm">
                  {`${window.location.origin}/teams/${generatedTeams.publicLink}`}
                </code>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${window.location.origin}/teams/${generatedTeams.publicLink}`
                    );
                    alert("Link copied to clipboard!");
                  }}
                  className="ml-2 text-blue-500 hover:text-blue-700"
                >
                  Copy
                </button>
              </div>
            )}
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {generatedTeams.teams.map((team, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-md p-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-lg">{team.teamName}</h4>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    Avg Skill: {team.averageSkill}
                  </span>
                </div>
                <ul className="space-y-1">
                  {team.players.map((player) => (
                    <li
                      key={player.playerId}
                      className="flex justify-between text-gray-700 py-1 border-b border-gray-100"
                    >
                      <span>{player.playerName}</span>
                      <span className="bg-gray-100 px-2 rounded">
                        Skill: {player.skill}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TeamGenerator;
