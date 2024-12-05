import { User } from "@/types/User";

export type AuthenticatedResponse = {
    token: string;
    user: User;
};