import { UserExpenseData } from "@/types/UserExpenseData";

export type User = {
    id: number;
    name: string;
    email: string;
    monthlyIncome: number;
    expenses: UserExpenseData[] | null;
}