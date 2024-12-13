import { UserExpenseData } from "@/types/UserExpenseData";

export type User = {
    id: number;
    name: string;
    email: string;
    monthly_income: number;
    expenses: UserExpenseData[] | null;
    expense_total_amount: number;
}