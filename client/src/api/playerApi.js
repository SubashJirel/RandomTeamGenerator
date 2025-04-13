import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const getPlayers = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/players`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error fetching players" };
  }
};

export const getPlayer = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/api/players/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error fetching player" };
  }
};
export const getPlayersByGroup = async (groupId) => {
  try {
    const response = await axios.get(`${API_URL}/api/players/group/${groupId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error fetching players" };
  }
};
export const createMultiplePlayer = async (playerData) => {
  try {
    const response = await axios.post(`${API_URL}/api/players`, playerData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error creating player" };
  }
};

export const updatePlayer = async (id, playerData) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/players/${id}`,
      playerData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error updating player" };
  }
};

export const deletePlayer = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/api/players/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error deleting player" };
  }
};
