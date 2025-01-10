import { getToken } from '@/lib/utils';
import axios from 'axios';


const AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

AxiosInstance.interceptors.request.use(
    config => {
        // Add authentication token if available
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


export default AxiosInstance