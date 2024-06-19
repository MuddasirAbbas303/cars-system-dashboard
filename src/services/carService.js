import axios from 'axios';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/cars`

export const getCars = async (token, page, limit) => {
    try {
        const response = await axios.get(API_URL, {
            params: { page: page + 1, limit },
            headers: { Authorization: token }
        });
        return response.data;
    } catch (error) {
        return {status: error.response.status};
    }
};

export const addCar = async (carData, token) => {
    try {
        const response = await axios.post(API_URL, carData, {
            headers: { Authorization: token }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding car:', error);
        throw error;
    }
};

export const updateCar = async (id, carData, token) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, carData, {
            headers: { Authorization: token }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating car:', error);
        throw error;
    }
};

export const deleteCar = async (id, token) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`, {
            headers: { Authorization: token }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting car:', error);
        throw error;
    }
};

export const getCarCount = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/count`, {
            headers: { Authorization: token }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching car count:', error);
        throw error;
    }
};
