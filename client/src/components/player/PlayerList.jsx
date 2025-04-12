// components/PlayerList.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  usePlayers,
  useDeletePlayer,
  useUpdatePlayer,
} from "../../hooks/usePlayers";

import SkillSelector from "./SkillSelector";

function PlayerList() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { data: players = [], isLoading, error } = usePlayers();
  const deletePlayerMutation = useDeletePlayer();
  const updatePlayerMutation = useUpdatePlayer();

  const [editingPlayer, setEditingPlayer] = useState(null);
  const [editData, setEditData] = useState({ name: "", skill: 3 });

  // If groupId is provided, filter players by that group
  const filteredPlayers = groupId
    ? players.filter((player) => player.groupId === groupId)
    : players;

  const handleEditPlayer = (player) => {
    setEditingPlayer(player._id);
    setEditData({ name: player.name, skill: player.skill || 3 });
  };

  const handleUpdatePlayer = async () => {
    try {
      await updatePlayerMutation.mutateAsync({
        id: editingPlayer,
        playerData: editData,
      });
      setEditingPlayer(null);
    } catch (error) {
      console.error("Failed to update player:", error);
    }
  };

  const handleDeletePlayer = async (id) => {
    if (window.confirm("Are you sure you want to delete this player?")) {
      try {
        await deletePlayerMutation.mutateAsync(id);
      } catch (error) {
        console.error("Failed to delete player:", error);
      }
    }
  };

  const handleEditChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  const handleGenerateTeams = () => {
    if (groupId) {
      navigate(`/generate/${groupId}`);
    }
  };

  if (isLoading) return <div className="text-center p-6">Loading...</div>;
  if (error)
    return (
      <div className="text-center p-6 text-red-500">Error: {error.message}</div>
    );

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {groupId ? `Players in Group: ${groupId}` : "All Players"}
        </h2>
        {groupId && (
          <button
            onClick={handleGenerateTeams}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Generate Teams
          </button>
        )}
      </div>

      {!filteredPlayers || filteredPlayers.length === 0 ? (
        <div className="text-center p-6 text-gray-500">
          No players found. Add some players to get started.
        </div>
      ) : (
        <div className="space-y-2">
          {filteredPlayers.map((player) => (
            <div
              key={player._id}
              className="flex items-center p-3 border border-gray-200 rounded-md"
            >
              {editingPlayer === player._id ? (
                <>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => handleEditChange("name", e.target.value)}
                    className="flex-grow p-2 border border-gray-300 rounded-md mr-2"
                  />
                  <div className="mx-2">
                    <SkillSelector
                      skill={editData.skill}
                      onChange={(value) => handleEditChange("skill", value)}
                    />
                  </div>
                  <button
                    onClick={handleUpdatePlayer}
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingPlayer(null)}
                    className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-grow">{player.name}</span>
                  <div className="flex items-center mr-4">
                    <span className="mr-2">Skill:</span>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <span
                          key={value}
                          className={`inline-block w-6 h-6 text-center rounded-md ${
                            value <= (player.skill || 3)
                              ? "bg-red-500 text-white"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {value}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleEditPlayer(player)}
                    className="text-blue-500 hover:text-blue-700 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePlayer(player._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PlayerList;
