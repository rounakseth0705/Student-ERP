import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
});

export const setAuthToken = (token) => {
    API.interceptors.request.use((req) => {
        if (token) {
        req.headers.Authorization = `Bearer ${token}`;
        }
        return req;
    },(error) => {
        Promise.reject(error);
    });
}

export default API;