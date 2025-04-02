
import { fetchData, createData, updateData, deleteData } from '../utils/api';

const ENDPOINT = '/categories/subcategories';

export interface SubcategoryData {
  id?: string;
  name: string;
  category_id: string;
  user_id: string;
}

export const SubcategoriesService = {
  getAllSubcategories: async (categoryId?: string, userId?: string) => {
    const params: any = {};
    
    if (categoryId) {
      params.category_id = categoryId;
    }
    
    if (userId) {
      params.user_id = userId;
    }
    
    return fetchData(`${ENDPOINT}/read.php`, params);
  },

  getSubcategory: async (id: string) => {
    return fetchData(`${ENDPOINT}/read_one.php`, { id });
  },

  createSubcategory: async (subcategoryData: SubcategoryData) => {
    return createData(`${ENDPOINT}/create.php`, subcategoryData);
  },

  updateSubcategory: async (subcategoryData: SubcategoryData) => {
    return updateData(`${ENDPOINT}/update.php`, subcategoryData);
  },

  deleteSubcategory: async (id: string, userId: string) => {
    return deleteData(`${ENDPOINT}/delete.php?id=${id}&user_id=${userId}`);
  }
};
