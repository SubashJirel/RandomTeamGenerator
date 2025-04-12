import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateMultiplePlayer } from "../../hooks/usePlayers";

import SkillSelector from "./SkillSelector";

function PlayerForm() {
  const navigate = useNavigate();
  const createMultiplePlayerMutation = useCreateMultiplePlayer();

  const [players, setPlayers] = useState([{ name: "", skill: 3 }]);
  const [groupName, setGroupName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddPlayerField = () => {
    setPlayers([...players, { name: "", skill: 3 }]);
  };

  const handleRemovePlayerField = (index) => {
    const updatedPlayers = [...players];
    updatedPlayers.splice(index, 1);
    setPlayers(updatedPlayers);
  };

  const handlePlayerChange = (index, field, value) => {
    const updatedPlayers = [...players];
    updatedPlayers[index][field] = value;
    setPlayers(updatedPlayers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Filter out empty player names
    const validPlayers = players.filter((player) => player.name.trim() !== "");

    if (validPlayers.length === 0) {
      setError("Please add at least one player");
      setIsLoading(false);
      return;
    }

    try {
      const response = await createMultiplePlayerMutation.mutateAsync({
        players: validPlayers,
        groupName: groupName || "Default Group",
      });

      // Navigate to the newly created group
      if (response && response.groupId) {
        navigate(`/players/${response.groupId}`);
      }
    } catch (error) {
      setError(error.message || "Failed to create players");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add Players</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">
            Group Name (Optional)
          </label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter group name"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Players</h3>
          </div>

          {players.map((player, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={player.name}
                onChange={(e) =>
                  handlePlayerChange(index, "name", e.target.value)
                }
                placeholder={`Player ${index + 1}`}
                className="flex-grow p-2 border border-gray-300 rounded-l-md"
                required
              />
              <div className="bg-gray-100 px-3 py-2 border-t border-b border-gray-300">
                <SkillSelector
                  skill={player.skill}
                  onChange={(value) =>
                    handlePlayerChange(index, "skill", value)
                  }
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemovePlayerField(index)}
                className="bg-red-500 text-white px-4 py-2 rounded-r-md hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddPlayerField}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm"
          >
            Add Player
          </button>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 disabled:bg-gray-400"
          >
            {isLoading ? "Saving..." : "Save Players"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PlayerForm;
