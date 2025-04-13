function TeamNameInput({ teams, onTeamChange, onAddTeam, onRemoveTeam }) {
  return (
    <div className="space-y-2">
      {teams.map((team, index) => (
        <div key={index} className="flex items-center space-x-2">
          <input
            type="text"
            value={team.name}
            onChange={(e) => onTeamChange(index, e.target.value)}
            placeholder={`Team ${index + 1} name`}
            className="flex-grow p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={() => onRemoveTeam(index)}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            ×
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={onAddTeam}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Add Team
      </button>
    </div>
  );
}

export default TeamNameInput;
