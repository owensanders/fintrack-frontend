import apiClient from "@/services/axios";
import { RegisterData } from "@/types/RegisterData";
import { LoginResponse } from "@/types/LoginResponse";

export const login = (email: string, password: string): Promise<{ data: LoginResponse }> => {
    return apiClient.post("/login", { email, password });
};

export const logout = () => {
    return apiClient.post("/logout");
};

export const register = (registerData: RegisterData) => {
    return apiClient.post("/register", registerData);
};
