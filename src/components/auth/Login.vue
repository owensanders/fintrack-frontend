<template>
  <div class="bg-gray-800 shadow-md rounded-lg p-8 w-full max-w-md">
    <h2 class="text-2xl font-semibold mb-6 text-center">Login</h2>
    <form @submit.prevent="handleLogin">
      <Input label="Email" id="email" type="email" v-model="email" required />
      <Input
        label="Password"
        id="password"
        type="password"
        v-model="password"
        required
      />
      <button
        type="submit"
        class="w-full py-2 px-4 bg-gray-900 hover:bg-gray-700 text-white font-semibold rounded-md shadow transition duration-150"
      >
        Login
      </button>
    </form>
    <router-link
      to="/register"
      class="mt-4 text-center cursor-pointer block text-white"
    >
      Don't have an account? Click here to register.
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Input from "@/components/Input.vue";

const email = ref("");
const password = ref("");

const handleLogin = () => {
  console.log(`Email: ${email.value}, Password: ${password.value}`);
};
</script>
