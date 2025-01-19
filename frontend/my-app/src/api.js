import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8070"; // Replace with your backend URL

// Fetch all reserves
export const fetchReserves = async () => {
  const response = await axios.get(`${"http://127.0.0.1:8070"}/reserves/`);
  return response.data;
};

// Create a new reserve
export const createReserve = async (reserve) => {
  const response = await axios.post(`${"http://127.0.0.1:8070"}/reserves/`, reserve);
  return response.data;
};

// Fetch endangered species by reserve ID
export const fetchSpeciesByReserve = async (reserveId) => {
  const response = await axios.get(`${"http://127.0.0.1:8070"}/reserves/${reserveId}/species/`);
  return response.data;
};

// Create new endangered species
export const createSpecies = async (species) => {
  const response = await axios.post(`${"http://127.0.0.1:8070"}/species/`, species);
  return response.data;
};

// Update reserve
export const updateReserve = async (reserveId, reserve) => {
  const response = await axios.put(`${"http://127.0.0.1:8070"}/reserves/${reserveId}`, reserve);
  return response.data;
};

// Update endangered species
export const updateSpecies = async (reserveId, species) => {
  const response = await axios.put(`${"http://127.0.0.1:8070"}/species/${reserveId}`, species);
  return response.data;
};

// Delete reserve
export const deleteReserve = async (reserveId) => {
  const response = await axios.delete(`${"http://127.0.0.1:8070"}/reserves/${reserveId}`);
  return response.data;
};

// Delete endangered species
export const deleteSpecies = async (reserveId) => {
  const response = await axios.delete(`${"http://127.0.0.1:8070"}/species/${reserveId}`);
  return response.data;
};
export const getAllSpecies = async () => {
    try {
      const response = await axios.get(`${"http://127.0.0.1:8070"}/species/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all species:', error);
      throw error;
    }
  };
  
  // Get species by reserve ID
  export const getSpeciesByReserve = async (reserveId) => {
    try {
      const response = await axios.get(`${"http://127.0.0.1:8070"}/reserves/${reserveId}/species/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching species by reserve:', error);
      throw error;
    }
  };
  
  // Create new species

  
  // Update species
  
  
  // Delete species
  