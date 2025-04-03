import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.vilartprod.ch/api';

export const fetchData = async (endpoint: string, params?: any) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoint}`, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
};

export const createData = async (endpoint: string, data: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}${endpoint}`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error creating data at ${endpoint}:`, error);
    throw error;
  }
};

export const updateData = async (endpoint: string, data: any) => {
  try {
    const response = await axios.put(`${API_BASE_URL}${endpoint}`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating data at ${endpoint}:`, error);
    throw error;
  }
};

export const deleteData = async (endpoint: string, params?: any) => {
  try {
    // If params is provided and it has an id property, we're using the JSON object method
    if (params && 'id' in params) {
      const response = await axios.delete(`${API_BASE_URL}${endpoint}`, {
        data: params,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } else {
      // Otherwise, we're using the query string method (for endpoints that expect ?id=xxx)
      const response = await axios.delete(`${API_BASE_URL}${endpoint}`);
      return response.data;
    }
  } catch (error) {
    console.error(`Error deleting data at ${endpoint}:`, error);
    throw error;
  }
};

export const uploadFile = async (endpoint: string, formData: FormData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}${endpoint}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error uploading file to ${endpoint}:`, error);
    throw error;
  }
};
