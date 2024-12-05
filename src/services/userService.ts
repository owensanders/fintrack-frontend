import apiClient from "@/services/axios";
import { User } from "@/types/User";

export const updateProfile = (id: number, name: string, email: string): Promise<{ data: User | null }> => {
    return apiClient.patch("/my-profile/update", { id, name, email });
};
