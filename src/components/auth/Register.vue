<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <h1 class="text-4xl font-bold mt-4 md:mt-0">
      FinTrack <i class="fa-solid fa-chart-pie text-green-500"></i>
    </h1>
    <div
        class="bg-zinc-800 shadow-md rounded-lg p-6 max-w-md mx-5 my-5 md:mx-auto md:w-full md:p-8"
    >
      <h2 class="text-2xl font-semibold mb-6 text-center">Register</h2>
      <form @submit.prevent="handleRegister">
        <FormErrors :errors="errors" />
        <Input
            label="Email"
            id="email"
            v-model="email"
            type="email"
            required
            :is-required="true"
        />
        <Input
            label="Name"
            id="name"
            v-model="name"
            type="text"
            required
            :is-required="true"
        />
        <Input
            label="Password"
            id="password"
            v-model="password"
            type="password"
            required
            :is-required="true"
        />
        <Input
            label="Confirm Password"
            id="confirm-password"
            v-model="confirmPassword"
            type="password"
            required
            :is-required="true"
        />
        <button
            type="submit"
            class="w-full py-2 px-4 bg-green-500 hover:bg-gray-700 text-white font-semibold rounded-md shadow transition duration-150"
            :disabled="loading"
        >
          <span v-if="loading">Loading...</span>
          <span v-else>Register</span>
        </button>
      </form>
      <router-link
          to="/login"
          class="mt-4 text-center cursor-pointer block text-green-500"
      >
        Already have an account? Click here to login.
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import Input from "@/components/ui/Input.vue";
import FormErrors from "@/components/ui/FormErrors.vue";
import { useAuthStore } from "@/stores/auth";
import apiClient from "@/services/axios";
import { register } from "@/services/authService";
import { processFormErrors, resetFormErrors } from "@/utils/formHelper";
import { AuthenticatedResponse } from "@/types/AuthenticatedResponse";
import { Errors } from "@/types/Errors";
import { RegisterData } from "@/types/RegisterData";

const router = useRouter();
const authStore = useAuthStore();
const email = ref("");
const name = ref("");
const password = ref("");
const confirmPassword = ref("");
const loading = ref(false);
const errors = reactive<Errors>({
  email: [],
  name: [],
  password: [],
  confirmPassword: [],
});

const handleRegister = async (): Promise<void> => {
  loading.value = true;
  try {
    resetFormErrors(errors);
    await registerUser();
  } catch (error: unknown) {
    const processedErrors = processFormErrors(error);
    if (Object.keys(processedErrors).length > 0) {
      Object.assign(errors, processedErrors);
    } else {
      errors.general = ["An unexpected error occurred. Please try again."];
      console.error("An unexpected error occurred:", error);
    }
  } finally {
    loading.value = false;
  }
};

const registerUser = async (): Promise<void> => {
  await apiClient.get("/sanctum/csrf-cookie");

  const registerData: RegisterData = {
    name: name.value,
    email: email.value,
    password: password.value,
    password_confirmation: confirmPassword.value,
  };

  const response = await register(registerData);
  const { token, user } = response.data as AuthenticatedResponse;
  authStore.setAuthenticated(token, user);
  await router.push("/dashboard");
};
</script>
