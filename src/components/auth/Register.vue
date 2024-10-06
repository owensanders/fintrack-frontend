<template>
  <div class="bg-gray-800 shadow-md rounded-lg p-8 w-full max-w-md">
    <h2 class="text-2xl font-semibold mb-6 text-center">Register</h2>

    <form @submit.prevent="handleRegister">
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
        <label for="first-name" class="font-medium">First name</label>
        <input
          type="text"
          id="first-name"
          v-model="firstName"
          required
          class="mt-1 w-full border-gray-600 bg-gray-700 text-white rounded-md shadow-sm p-1"
        />
      </div>
      <div class="mb-4">
        <label for="last-name" class="font-medium">Last name</label>
        <input
          type="text"
          id="last-name"
          v-model="lastName"
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
      <div class="mb-4">
        <label for="password" class="font-medium">Confirm password</label>
        <input
          type="password"
          id="confirm-password"
          v-model="confirmPassword"
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
      to="/login"
      class="mt-4 text-center cursor-pointer block text-white"
    >
      Already have an account? Click here to login.
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const firstName = ref("");
const lastName = ref("");
const password = ref("");
const confirmPassword = ref("");

const handleRegister = () => {
  console.log(
    `Email: ${email.value}, First name: ${firstName.value}, Last name: ${lastName.value}, Password: ${password.value}, Confirm password: ${confirmPassword.value}`
  );
};
</script>
