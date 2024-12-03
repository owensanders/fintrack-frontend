import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const apiClient = axios.create({
    baseURL: "http://localhost:80",
    withCredentials: true,
    withXSRFToken: true,
});

apiClient.interceptors.request.use((config) => {
    const authStore = useAuthStore();

    if (authStore.token) {
        config.headers.Authorization = `Bearer ${authStore.token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default apiClient;
