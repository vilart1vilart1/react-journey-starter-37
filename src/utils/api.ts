import axios from 'axios';

const API_URL = process.env.VITE_API_URL || '';

const handleApiError = (error: any) => {
  if (axios.isAxiosError(error)) {
    console.error('Axios error details:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      // Handle unauthorized error (e.g., redirect to login)
      console.error('Unauthorized access. Redirecting to login.');
      // window.location.href = '/login'; // Uncomment this line in a browser environment
    }
  } else {
    console.error('Non-Axios error:', error);
  }
};

/**
 * Fetch data from the API endpoint
 * @param url API endpoint
 * @param params Query parameters
 * @returns API response
 */
export const fetchData = async (url: string, params: Record<string, any> = {}) => {
  try {
    const queryParams = new URLSearchParams(params);
    const endpoint = `${API_URL}/api${url}?${queryParams.toString()}`;
    console.log('GET request to:', endpoint);
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('GET Error:', error);
    handleApiError(error);
    throw error;
  }
};

/**
 * Create data to the API endpoint
 * @param url API endpoint
 * @param data Data to be created
 * @returns API response
 */
export const createData = async (url: string, data: any) => {
  try {
    const endpoint = `${API_URL}/api${url}`;
    console.log('POST request to:', endpoint, data);
    const response = await axios.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('POST Error:', error);
    handleApiError(error);
    throw error;
  }
};

/**
 * Update data to the API endpoint
 * @param url API endpoint
 * @param data Data to be updated
 * @returns API response
 */
export const updateData = async (url: string, data: any) => {
  try {
    const endpoint = `${API_URL}/api${url}`;
    console.log('PUT request to:', endpoint, data);
    const response = await axios.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('PUT Error:', error);
    handleApiError(error);
    throw error;
  }
};

/**
 * Delete data from the endpoint
 * @param url API endpoint
 * @param idOrParams ID of the resource to delete or query parameters
 * @returns API response
 */
export const deleteData = async (url: string, idOrParams?: string | Record<string, any>) => {
  try {
    // Check if idOrParams is a string (old style) or an object (new style)
    let endpoint = url;
    
    if (typeof idOrParams === 'string') {
      // If URL already has parameters, add ID as a query parameter
      if (url.includes('?')) {
        endpoint = `${url}&id=${idOrParams}`;
      } else {
        endpoint = `${url}?id=${idOrParams}`;
      }
    } else if (idOrParams && typeof idOrParams === 'object') {
      // If URL already has parameters
      const separator = url.includes('?') ? '&' : '?';
      const params = new URLSearchParams();
      
      // Add all parameters from the object
      Object.entries(idOrParams).forEach(([key, value]) => {
        params.append(key, value);
      });
      
      endpoint = `${url}${separator}${params.toString()}`;
    }
    
    console.log('DELETE request to:', endpoint);
    
    const response = await axios.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error('DELETE Error:', error);
    handleApiError(error);
    throw error;
  }
};
