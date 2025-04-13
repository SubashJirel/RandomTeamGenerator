import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const getGeneratedTeams = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/generated-teams`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error fetching generated teams" };
  }
};

export const getGeneratedTeamByLink = async (link) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/generatedTeams/link/${link}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error fetching generated team" };
  }
};

export const generateTeams = async (title) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/generated-teams/generate`,
      { title }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error generating teams" };
  }
};

export const generateTeamsFromGroup = async ({ groupId, teams, title }) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/generatedTeams/generateGroup`,
      {
        groupId,
        teams,
        title,
      }
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { message: "Error generating teams from group" }
    );
  }
};
