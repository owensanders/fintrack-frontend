import {UserExpenseData} from "@/types/UserExpenseData";
import {UserSavingData} from "@/types/UserSavingData";

export type User = {
    id: number;
    name: string;
    email: string;
    monthly_income: number;
    expenses: UserExpenseData[] | null;
    savings: UserSavingData[] | null;
    expense_total_amount: number;
    savings_total_amount: number;
}