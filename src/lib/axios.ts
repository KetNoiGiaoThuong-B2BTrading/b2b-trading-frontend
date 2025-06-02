import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Thêm interceptor
axiosInstance.interceptors.request.use((config) => {
    const token = Cookies.get('access_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default axiosInstance;
