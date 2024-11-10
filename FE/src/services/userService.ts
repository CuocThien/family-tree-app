import api from '../config/axios.config';
import { ENDPOINTS } from '../config/api.config';
import { GetAllUsersParams } from '../types/user.interface';

export const userService = {
    getAllUsers: async (params: GetAllUsersParams) => {
        const response = await api.get(ENDPOINTS.USERS, { params });
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
    },

    deleteUser: async (id: string) => {
        const response = await api.delete(`${ENDPOINTS.USERS}/${id}`);
        return response.data?.data;
    }
}; 