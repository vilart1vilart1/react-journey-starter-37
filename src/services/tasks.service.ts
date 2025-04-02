
import { fetchData, createData, updateData, deleteData } from '../utils/api';

const ENDPOINT = '/tasks';

export const TasksService = {
  getAllTasks: async (userId?: string) => {
    const params = userId ? { user_id: userId } : {};
    return fetchData(`${ENDPOINT}/read.php`, params);
  },

  getTask: async (id: string) => {
    return fetchData(`${ENDPOINT}/read_one.php`, { id });
  },

  createTask: async (taskData: any) => {
    return createData(`${ENDPOINT}/create.php`, taskData);
  },

  updateTask: async (taskData: any) => {
    return updateData(`${ENDPOINT}/update.php`, taskData);
  },

  deleteTask: async (id: string, userId: string) => {
    try {
      const params = { id, user_id: userId };
      return await deleteData(`${ENDPOINT}/delete.php`, params);
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
};
