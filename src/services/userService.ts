import apiClient from "@/services/axios";
import { User } from "@/types/User";

export const updateProfile = (id: number, name: string, email: string, monthlyIncome: number): Promise<{ data: User | null }> => {
    return apiClient.put("/my-profile", { id, name, email, monthly_income: monthlyIncome });
};
