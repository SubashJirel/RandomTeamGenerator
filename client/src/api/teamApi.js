import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const getTeams = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/teams`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error fetching teams" };
  }
};

export const getTeam = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/api/teams/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error fetching team" };
  }
};

export const createTeam = async (teamData) => {
  try {
    const response = await axios.post(`${API_URL}/api/teams`, teamData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error creating team" };
  }
};

export const updateTeam = async (id, teamData) => {
  try {
    const response = await axios.put(`${API_URL}/api/teams/${id}`, teamData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error updating team" };
  }
};

export const deleteTeam = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/api/teams/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error deleting team" };
  }
};
