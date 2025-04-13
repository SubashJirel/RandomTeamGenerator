import { useState } from "react";
import { useTeams, useDeleteTeam, useUpdateTeam } from "../../hooks/useTeams";

function TeamList() {
  const { data: teams = [], isLoading, error } = useTeams();
  const deleteTeamMutation = useDeleteTeam();
  const updateTeamMutation = useUpdateTeam();

  const [editingTeam, setEditingTeam] = useState(null);
  const [editData, setEditData] = useState({ name: "" });

  const handleEditTeam = (team) => {
    setEditingTeam(team._id);
    setEditData({ name: team.name });
  };

  const handleUpdateTeam = async () => {
    try {
      await updateTeamMutation.mutateAsync({
        id: editingTeam,
        teamData: editData,
      });
      setEditingTeam(null);
    } catch (error) {
      console.error("Failed to update team:", error);
    }
  };

  const handleDeleteTeam = async (id) => {
    if (window.confirm("Are you sure you want to delete this team?")) {
      try {
        await deleteTeamMutation.mutateAsync(id);
      } catch (error) {
        console.error("Failed to delete team:", error);
      }
    }
  };

  if (isLoading) return <div className="text-center p-6">Loading...</div>;
  if (error)
    return (
      <div className="text-center p-6 text-red-500">Error: {error.message}</div>
    );

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Teams</h2>

      {!teams || teams.length === 0 ? (
        <div className="text-center p-6 text-gray-500">
          No teams found. Add some teams to get started.
        </div>
      ) : (
        <div className="space-y-2">
          {teams.map((team) => (
            <div
              key={team._id}
              className="flex items-center p-3 border border-gray-200 rounded-md"
            >
              {editingTeam === team._id ? (
                <>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                    className="flex-grow p-2 border border-gray-300 rounded-md mr-2"
                  />
                  <button
                    onClick={handleUpdateTeam}
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingTeam(null)}
                    className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-grow">{team.name}</span>
                  <button
                    onClick={() => handleEditTeam(team)}
                    className="text-blue-500 hover:text-blue-700 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTeam(team._id)}
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

export default TeamList;
