import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getGeneratedTeamByLink } from "../../api/generatedTeamApi";

function TeamView() {
  const { publicId } = useParams();

  const { data: teamData, isLoading } = useQuery({
    queryKey: ["teams", publicId],
    queryFn: () => getGeneratedTeamByLink(publicId),
  });

  if (isLoading) {
    return <div className="text-center p-4">Loading teams...</div>;
  }

  if (!teamData) {
    return <div className="text-center p-4">Teams not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">{teamData.title}</h2>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {teamData.teams.map((team, index) => (
          <div key={index} className="border border-gray-200 rounded-md p-4">
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
  );
}

export default TeamView;
