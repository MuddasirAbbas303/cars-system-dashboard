import axios from 'axios';

const API_URL = 'http://localhost:3001/api/auth';

export const signUp = async (email, password) => {
    const response = await axios.post(`${API_URL}/signup`, { email, password });
    return response?.data;
};

export const signIn = async (email, password) => {
    const response = await axios.post(`${API_URL}/signin`, { email, password });
    return response?.data;
};

export const signOut = () => {
    localStorage.removeItem('token');
};
