import apiClient from "@/services/axios";
import {User} from "@/types/User";
import {UserSavingData} from "@/types/UserSavingData";

export const store = (savingData: UserSavingData): Promise<User> => {
    return apiClient.post('user-savings', savingData);
}

export const destroy = (savingId: number): Promise<User> => {
    return apiClient.delete(`user-savings/${savingId}`);
}

export const update = (savingData: UserSavingData): Promise<User> => {
    return apiClient.put(`user-savings/${savingData.id}`, savingData);
}