<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <h1 class="text-4xl font-bold">
      FinTrack <i class="fa-solid fa-chart-pie text-green-500"></i>
    </h1>
    <div
        class="bg-zinc-800 shadow-md rounded-lg p-6 max-w-md mx-5 my-5 md:mx-auto md:w-full md:p-8"
    >
      <h2 class="text-2xl font-semibold mb-6 text-center">Login</h2>
      <form @submit.prevent="handleLogin">
        <FormErrors :errors="errors" />
        <Input
            label="Email"
            id="email"
            type="email"
            v-model="email"
            required
            :is-required="true"
        />
        <Input
            label="Password"
            id="password"
            type="password"
            v-model="password"
            required
            :is-required="true"
        />
        <button
            type="submit"
            class="w-full py-2 px-4 bg-green-500 hover:bg-gray-700 text-white font-semibold rounded-md shadow transition duration-150"
        >
          Login
        </button>
      </form>
      <router-link
          to="/register"
          class="mt-4 text-center cursor-pointer block text-green-500"
      >
        Don't have an account? Click here to register.
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import Input from "@/components/ui/Input.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import apiClient from "@/services/axios";
import { login } from "@/services/authService";
import { resetFormErrors } from "@/utils/formHelper";
import { AuthenticatedResponse } from "@/types/AuthenticatedResponse";
import { Errors } from "@/types/Errors";
import FormErrors from "@/components/ui/FormErrors.vue";

const router = useRouter();
const authStore = useAuthStore();
const email = ref("");
const password = ref("");
const errors = reactive<Errors>({
  email: [],
  password: [],
});

const handleLogin = async (): Promise<void> => {
  try {
    resetFormErrors(errors);

    await apiClient.get("/sanctum/csrf-cookie");
    const response = await login(email.value, password.value);
    const { token, user } = response.data as AuthenticatedResponse;

    authStore.setAuthenticated(token, user);
    router.push("/dashboard");
  } catch (error: never) {
    if (error?.response?.status === 422) {
      Object.keys(error.response.data.errors).forEach((key) => {
        errors[key] = error.response.data.errors[key];
      });
    } else {
      console.error("An unexpected error occurred:", error);
    }
  }
};
</script>
