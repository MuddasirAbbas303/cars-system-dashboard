import axios from 'axios';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/categories`

export const getCategories = async (token) => {
    try {
        const response = await axios.get(API_URL, {
            headers: { Authorization: token }
        });
        return response.data;
    } catch (error) {
        return {status: error.response.status};
    }
};

export const addCategory = async (categoryData, token) => {
    try {
        const response = await axios.post(API_URL, categoryData, {
            headers: { Authorization: token }
        });
        return response.data;
    } catch (error) {
        return {status: error.response.data.code};
    }
};

export const updateCategory = async (id, categoryData, token) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, categoryData, {
            headers: { Authorization: token }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating category:', error);
        throw error;
    }
};

export const deleteCategory = async (id, token) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`, {
            headers: { Authorization: token }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error;
    }
};
