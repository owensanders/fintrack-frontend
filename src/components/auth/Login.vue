<template>
  <div class="bg-gray-800 shadow-md rounded-lg p-8 w-full max-w-md">
    <h2 class="text-2xl font-semibold mb-6 text-center">Login</h2>

    <form @submit.prevent="handleLogin">
      <div class="mb-4">
        <label for="email" class="font-medium">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
          class="mt-1 w-full border-gray-600 bg-gray-700 text-white rounded-md shadow-sm p-1"
        />
      </div>
      <div class="mb-4">
        <label for="password" class="font-medium">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          class="mt-1 w-full border-gray-600 bg-gray-700 text-white rounded-md shadow-sm p-1"
        />
      </div>
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

const email = ref("");
const password = ref("");

const handleLogin = () => {
  console.log(`Email: ${email.value}, Password: ${password.value}`);
};
</script>
