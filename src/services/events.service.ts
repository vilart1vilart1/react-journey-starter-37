
import { fetchData, createData, updateData, deleteData } from '../utils/api';

const ENDPOINT = '/events';

export const EventsService = {
  getAllEvents: async (userId?: string) => {
    const params = userId ? { user_id: userId } : {};
    return fetchData(`${ENDPOINT}/read.php`, params);
  },

  getEvent: async (id: string, userId?: string) => {
    const params = { id };
    if (userId) params['user_id'] = userId;
    return fetchData(`${ENDPOINT}/read_one.php`, params);
  },

  createEvent: async (eventData: any) => {
    return createData(`${ENDPOINT}/create.php`, eventData);
  },

  updateEvent: async (eventData: any) => {
    return updateData(`${ENDPOINT}/update.php`, eventData);
  },

  deleteEvent: async (id: string, userId?: string) => {
    try {
      const params = { id };
      if (userId) {
        Object.assign(params, { user_id: userId });
      }
      return await deleteData(`${ENDPOINT}/delete.php`, params);
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  }
};
