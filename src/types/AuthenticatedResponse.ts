export type AuthenticatedResponse = {
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
};