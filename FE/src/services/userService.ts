import api from '../config/axios.config';
import { ENDPOINTS } from '../config/api.config';

export const userService = {
    getAllUsers: async () => {
        const response = await api.get(ENDPOINTS.USERS);
        return response.data?.data;
    },

    createUser: async (userData: any) => {
        const response = await api.post(ENDPOINTS.USERS, userData);
        return response.data?.data;
    },

    updateUser: async (id: string, userData: any) => {
        const response = await api.put(`${ENDPOINTS.USERS}/${id}`, userData);
        return response.data?.data;
    },

    getUser: async (id: string) => {
        const response = await api.get(`${ENDPOINTS.USERS}/${id}`);
        return response.data?.data;
    },

    getFamilyTree: async () => {
        const response = await api.get(`${ENDPOINTS.USERS}/family-tree`);
        return response.data?.data;
    }
}; 