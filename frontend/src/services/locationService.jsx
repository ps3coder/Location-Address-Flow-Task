import axios from 'axios';

export const getLocations = async () => {
    return axios.get('http://localhost:3000/api/location');
};

export const getAddressById = async (locationId) => {
    return axios.get(`http://localhost:3000/api/address/${locationId}`);
};
