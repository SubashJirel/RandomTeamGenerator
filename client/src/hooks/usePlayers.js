import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPlayers,
  getPlayer,
  createMultiplePlayer,
  updatePlayer,
  deletePlayer,
} from "../api/playerApi";

export const usePlayers = () => {
  return useQuery({
    queryKey: ["players"],
    queryFn: getPlayers,
  });
};

export const usePlayer = (id) => {
  return useQuery({
    queryKey: ["player", id],
    queryFn: () => getPlayer(id),
    enabled: !!id,
  });
};

export const useCreateMultiplePlayer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMultiplePlayer,
    onSuccess: () => {
      queryClient.invalidateQueries(["players"]);
    },
  });
};

export const useUpdatePlayer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, playerData }) => updatePlayer(id, playerData),
    onSuccess: () => {
      queryClient.invalidateQueries(["players"]);
    },
  });
};

export const useDeletePlayer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePlayer,
    onSuccess: () => {
      queryClient.invalidateQueries(["players"]);
    },
  });
};
