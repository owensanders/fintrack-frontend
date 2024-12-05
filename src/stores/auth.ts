import { defineStore } from 'pinia';
import { ref } from 'vue';
import { User } from "@/types/User";

export const useAuthStore = defineStore('auth', () => {
    const token = ref<string | null>(null);
    const user = ref<User | null>(null);

    const initialiseAuthState = () => {
        const storedToken = sessionStorage.getItem('token');
        const storedUser = sessionStorage.getItem('user');

        if (storedToken && storedUser) {
            token.value = storedToken;
            user.value = JSON.parse(storedUser);
        }
    };

    initialiseAuthState();

    const setAuthenticated = (tokenValue: string, userDetails: User) => {
        token.value = tokenValue;
        user.value = userDetails;

        sessionStorage.setItem('token', tokenValue);
        sessionStorage.setItem('user', JSON.stringify(userDetails));
    };

    const setUser = (userDetails: User) => {
        user.value = userDetails;
        sessionStorage.setItem('user', JSON.stringify(userDetails));
    }

    const logout = () => {
        token.value = null;
        user.value = null;

        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
    };

    return {
        token,
        user,
        setAuthenticated,
        setUser,
        logout,
        initialiseAuthState,
    };
});
