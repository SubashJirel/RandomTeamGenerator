import { usePlayers, useDeletePlayer } from "../hooks/usePlayers";

export const PlayersList = () => {
  const { data: players, isLoading } = usePlayers();
  const deletePlayerMutation = useDeletePlayer();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Player List</h2>
      <ul>
        {players.map((player) => (
          <li key={player._id}>
            {player.name}
            <button onClick={() => deletePlayerMutation.mutate(player._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
