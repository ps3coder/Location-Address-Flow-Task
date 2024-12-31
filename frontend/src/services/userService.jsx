import apiClient from '../utils/apiClient';

export const getUsers = async () => {
    try {
        const response = await apiClient.get('/user');
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};
