import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';
import { User } from "@/interfaces/User";

export const useAuthStore = defineStore('auth', () => {
    const token = ref<string | null>(null);
    const user = ref<User | null>(null);

    onMounted(() => {
        const storedToken = sessionStorage.getItem('token');
        const storedUser = sessionStorage.getItem('user');

        if (storedToken) {
            token.value = storedToken;
        }

        if (storedUser) {
            user.value = JSON.parse(storedUser);
        }
    });

    const setAuthenticated = (tokenValue: string, userDetails: User) => {
        token.value = tokenValue;
        user.value = userDetails;

        sessionStorage.setItem('token', tokenValue);
        sessionStorage.setItem('user', JSON.stringify(userDetails));
    };

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
        logout,
    };
});
