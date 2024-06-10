import axios from 'axios';



const API_URL = import.meta.env.VITE_BASE_URL;
const axiosInstance = axios.create({
    baseURL: 'https://amplasystem-ae692e9c9a30.herokuapp.com',
});

axiosInstance.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');

        if (user.token) {
            config.headers['Authorization'] = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default axiosInstance;
