import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';
import {User} from "@/interfaces/User";

export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated = ref<boolean>(false);
    const user = ref<User | null>(null);

    onMounted(() => {
        const storedAuthState = sessionStorage.getItem('isAuthenticated');
        const storedUser = sessionStorage.getItem('user');

        if (storedAuthState) {
            isAuthenticated.value = JSON.parse(storedAuthState);
        }

        if (storedUser) {
            user.value = JSON.parse(storedUser);
        }
    });

    const setAuthenticated = (value: boolean, userDetails: User) => {
        isAuthenticated.value = value;
        user.value = userDetails;

        sessionStorage.setItem('isAuthenticated', JSON.stringify(value));
        sessionStorage.setItem('user', JSON.stringify(userDetails));
    };

    const logout = () => {
        isAuthenticated.value = false;
        user.value = null;

        sessionStorage.removeItem('isAuthenticated');
        sessionStorage.removeItem('user');
    };

    return {
        isAuthenticated,
        user,
        setAuthenticated,
        logout,
    };
});
