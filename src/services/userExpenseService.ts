import apiClient from "@/services/axios";
import { UserExpenseData } from "@/types/UserExpenseData";
import {User} from "@/types/User";

export const store = (expenseData: UserExpenseData): Promise<User> => {
    return apiClient.post('user-expenses', expenseData);
}

export const destroy = (expenseId: number): Promise<User> => {
    return apiClient.delete(`user-expenses/${expenseId}`);
}

export const update = (expenseData: UserExpenseData): Promise<User> => {
    return apiClient.put(`user-expenses/${expenseData.id}`, {
        expense_name: expenseData.expense_name,
        expense_amount: expenseData.expense_amount,
    });
}