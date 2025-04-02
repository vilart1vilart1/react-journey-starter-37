
import { fetchData, createData, updateData, deleteData } from '../utils/api';

const ENDPOINT = '/transactions';

export const TransactionsService = {
  getAllTransactions: async (userId?: string) => {
    const params = userId ? { user_id: userId } : {};
    return fetchData(`${ENDPOINT}/read.php`, params);
  },

  getTransaction: async (id: string) => {
    return fetchData(`${ENDPOINT}/read_one.php`, { id });
  },

  createTransaction: async (transactionData: any) => {
    return createData(`${ENDPOINT}/create.php`, transactionData);
  },

  updateTransaction: async (transactionData: any) => {
    return updateData(`${ENDPOINT}/update.php`, transactionData);
  },

  deleteTransaction: async (id: string, userId?: string) => {
    try {
      const params = { id };
      if (userId) {
        Object.assign(params, { user_id: userId });
      }
      return await deleteData(`${ENDPOINT}/delete.php`, params);
    } catch (error) {
      console.error('Error deleting transaction:', error);
      throw error;
    }
  }
};
