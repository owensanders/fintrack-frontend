import apiClient from "@/services/axios";
import { RegisterData } from "@/interfaces/RegisterData";

export const login = (email: string, password: string) => {
    return apiClient.post("/login", { email, password });
};

export const logout = () => {
    return apiClient.post("/logout");
};

export const register = (registerData: RegisterData) => {
    return apiClient.post("/register", registerData);
};
