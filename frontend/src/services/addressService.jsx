import apiClient from '../utils/apiClient';

export const getAddressById = async (id) => {
    try {
        const response = await apiClient.get(`/address/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching address with ID ${id}:`, error);
        throw error;
    }
};
