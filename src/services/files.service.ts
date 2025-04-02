
import { fetchData, createData, updateData, deleteData } from '../utils/api';
import { File } from '../types';

const ENDPOINT = '/files';

export interface FileUploadResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
    url: string;
    type: string;
    size: string;
  }
}

export const FilesService = {
  getAllFiles: async (userId?: string) => {
    try {
      const params = userId ? { user_id: userId } : {};
      const response = await fetchData(`${ENDPOINT}/read.php`, params);
      
      if (!Array.isArray(response)) {
        console.error('Expected array of files but got:', response);
        return [];
      }
      
      return response.map((file: any) => ({
        id: file.id,
        name: file.name,
        type: file.type,
        size: file.size,
        url: file.url,
        date: file.created_at,
        user_id: file.user_id,
        category_id: file.category_id,
        subcategory_id: file.subcategory_id,
        category_name: file.category_name,
        subcategory_name: file.subcategory_name
      }));
    } catch (error) {
      console.error('Error fetching files:', error);
      throw error;
    }
  },

  uploadFile: async (file: File, userId?: string, categoryId?: string, subcategoryId?: string) => {
    try {
      if (!file) {
        throw new Error('No file provided');
      }
      
      const formData = new FormData();
      formData.append('file', file);
      
      if (userId) {
        formData.append('user_id', userId);
      }
      
      if (categoryId) {
        formData.append('category_id', categoryId);
      }
      
      if (subcategoryId) {
        formData.append('subcategory_id', subcategoryId);
      }
      
      const response = await fetch(`${process.env.VITE_API_URL || ''}/api/files/create.php`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  },

  deleteFile: async (id: string) => {
    try {
      return await deleteData(`${ENDPOINT}/delete.php?id=${id}`);
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }
};
