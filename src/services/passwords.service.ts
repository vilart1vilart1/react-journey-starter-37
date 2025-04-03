
import { fetchData, createData, updateData, deleteData } from '../utils/api';

const ENDPOINT = '/passwords';

export const PasswordsService = {
  getAllPasswords: async (userId?: string) => {
    const params = userId ? { user_id: userId } : {};
    return fetchData(`${ENDPOINT}/read.php`, params);
  },

  getPassword: async (id: string, userId?: string) => {
    const params: { id: string; user_id?: string } = { id };
    if (userId) params.user_id = userId;
    return fetchData(`${ENDPOINT}/read_one.php`, params);
  },

  createPassword: async (passwordData: any) => {
    return createData(`${ENDPOINT}/create.php`, passwordData);
  },

  updatePassword: async (passwordData: any) => {
    return updateData(`${ENDPOINT}/update.php`, passwordData);
  },

  deletePassword: async (id: string, userId?: string) => {
    try {
      const params: { id: string; user_id?: string } = { id, user_id: userId };
      return await deleteData(`${ENDPOINT}/delete.php`, params);
    } catch (error) {
      console.error('Error deleting password:', error);
      throw error;
    }
  }
};
