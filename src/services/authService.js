import axios from 'axios';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/auth`;

export const signUp = async (email) => {
    const response = await axios.post(`${API_URL}/signup`, { email });
    return response?.data;
};

export const signIn = async (email, password) => {
    const response = await axios.post(`${API_URL}/signin`, { email, password });
    return response?.data;
};

export const signOut = () => {
    localStorage.removeItem('token');
};
