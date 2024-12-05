import apiClient from "@/services/axios";
import { RegisterData } from "@/types/RegisterData";
import { AuthenticatedResponse } from "@/types/AuthenticatedResponse";

export const login = (email: string, password: string): Promise<{ data: AuthenticatedResponse }> => {
    return apiClient.post("/login", { email, password });
};

export const logout = (): Promise<void> => {
    return apiClient.post("/logout");
};

export const register = (registerData: RegisterData): Promise<{ data: AuthenticatedResponse }> => {
    return apiClient.post("/register", registerData);
};
