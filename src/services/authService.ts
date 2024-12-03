import apiClient from "@/services/axios";

export const login = (email: string, password: string) => {
    return apiClient.post("/login", { email, password });
};

export const logout = () => {
    return apiClient.post("/logout");
};
