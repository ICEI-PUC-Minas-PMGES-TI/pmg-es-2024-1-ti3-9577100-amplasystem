import axios from 'axios';


const apiUrl = import.meta.env.VITE_API_URL as string;

const axiosInstance = axios.create({
    baseURL: apiUrl,
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
