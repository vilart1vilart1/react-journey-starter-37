
import { fetchData, createData, updateData, deleteData } from '../utils/api';
import { Category } from '../types/categories';

const ENDPOINT = '/categories';

export const CategoriesService = {
  // Get all categories for a specific entity type
  getAllCategories: async (userId?: string, entityType?: string) => {
    const params: any = {};
    
    if (userId) {
      params.user_id = userId;
    }
    
    if (entityType) {
      params.entity_type = entityType;
    }
    
    try {
      return await fetchData(`${ENDPOINT}/read.php`, params);
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Create a new category
  createCategory: async (categoryData: Partial<Category>) => {
    try {
      return await createData(`${ENDPOINT}/create.php`, categoryData);
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  },

  // Update an existing category
  updateCategory: async (categoryData: Partial<Category>) => {
    try {
      return await updateData(`${ENDPOINT}/update.php`, categoryData);
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  },

  // Delete a category
  deleteCategory: async (id: string, userId?: string) => {
    try {
      return await deleteData(`${ENDPOINT}/delete.php?id=${id}&user_id=${userId}`);
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  }
};
