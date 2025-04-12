import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateTeamsFromGroup } from "../api/generatedTeamApi";

export const useGenerateTeamsFromGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: generateTeamsFromGroup,
    onSuccess: () => {
      queryClient.invalidateQueries(["generated-teams"]);
    },
  });
};
