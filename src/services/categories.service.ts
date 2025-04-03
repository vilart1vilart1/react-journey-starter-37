
import { fetchData, createData, updateData, deleteData } from '../utils/api';
import { Category, Subcategory } from '../types/categories';
import { AuthService } from './auth.service';

const ENDPOINT = '/categories';

export const CategoriesService = {
  // Get all categories for a specific entity type
  getCategories: async (entityType: string) => {
    const currentUser = AuthService.getCurrentUser();
    const userId = currentUser?.id;
    const params = { 
      user_id: userId,
      entity_type: entityType
    };
    
    try {
      return await fetchData(`${ENDPOINT}/read.php`, params);
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Get all categories for all entity types
  getAllCategories: async () => {
    const currentUser = AuthService.getCurrentUser();
    const userId = currentUser?.id;
    const params = { user_id: userId };
    
    try {
      return await fetchData(`${ENDPOINT}/read.php`, params);
    } catch (error) {
      console.error('Error fetching all categories:', error);
      throw error;
    }
  },

  // Create a new category
  createCategory: async (categoryData: Category) => {
    try {
      const currentUser = AuthService.getCurrentUser();
      const userId = currentUser?.id;
      
      const data = {
        ...categoryData,
        user_id: userId
      };
      
      return await createData(`${ENDPOINT}/create.php`, data);
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  },

  // Update an existing category
  updateCategory: async (categoryData: Category) => {
    try {
      const currentUser = AuthService.getCurrentUser();
      const userId = currentUser?.id;
      
      const data = {
        ...categoryData,
        user_id: userId
      };
      
      return await updateData(`${ENDPOINT}/update.php`, data);
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  },

  // Delete a category
  deleteCategory: async (id: string) => {
    try {
      const currentUser = AuthService.getCurrentUser();
      const userId = currentUser?.id;
      
      return await deleteData(`${ENDPOINT}/delete.php?id=${id}&user_id=${userId}`);
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  },

  // Get all subcategories for a category
  getSubcategories: async (categoryId: string) => {
    const currentUser = AuthService.getCurrentUser();
    const userId = currentUser?.id;
    const params = { 
      user_id: userId,
      category_id: categoryId
    };
    
    try {
      return await fetchData(`${ENDPOINT}/subcategories/read.php`, params);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      throw error;
    }
  },

  // Create a new subcategory
  createSubcategory: async (subcategoryData: Subcategory) => {
    try {
      const currentUser = AuthService.getCurrentUser();
      const userId = currentUser?.id;
      
      const data = {
        ...subcategoryData,
        user_id: userId
      };
      
      return await createData(`${ENDPOINT}/subcategories/create.php`, data);
    } catch (error) {
      console.error('Error creating subcategory:', error);
      throw error;
    }
  },

  // Update an existing subcategory
  updateSubcategory: async (subcategoryData: Subcategory) => {
    try {
      const currentUser = AuthService.getCurrentUser();
      const userId = currentUser?.id;
      
      const data = {
        ...subcategoryData,
        user_id: userId
      };
      
      return await updateData(`${ENDPOINT}/subcategories/update.php`, data);
    } catch (error) {
      console.error('Error updating subcategory:', error);
      throw error;
    }
  },

  // Delete a subcategory
  deleteSubcategory: async (id: string) => {
    try {
      const currentUser = AuthService.getCurrentUser();
      const userId = currentUser?.id;
      
      return await deleteData(`${ENDPOINT}/subcategories/delete.php?id=${id}&user_id=${userId}`);
    } catch (error) {
      console.error('Error deleting subcategory:', error);
      throw error;
    }
  }
};
