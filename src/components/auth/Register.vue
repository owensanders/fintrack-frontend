<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <h1 class="text-4xl font-bold mt-4 md:mt-0">
      FinTrack <i class="fa-solid fa-chart-pie"></i>
    </h1>
    <div
        class="bg-gray-800 shadow-md rounded-lg p-6 max-w-md mx-5 my-5 md:mx-auto md:w-full md:p-8"
    >
      <h2 class="text-2xl font-semibold mb-6 text-center">Register</h2>
      <form @submit.prevent="handleRegister">
        <Input label="Email" id="email" v-model="email" type="email"/>
        <Input
            label="First name"
            id="first-name"
            v-model="firstName"
            type="text"
        />
        <Input label="Last name" id="last-name" v-model="lastName" type="text"/>
        <Input
            label="Password"
            id="password"
            v-model="password"
            type="password"
        />
        <Input
            label="Confirm password"
            id="confirm-password"
            v-model="confirmPassword"
            type="password"
        />
        <button
            type="submit"
            class="w-full py-2 px-4 bg-gray-900 hover:bg-gray-700 text-white font-semibold rounded-md shadow transition duration-150"
        >
          Register
        </button>
      </form>
      <router-link
          to="/login"
          class="mt-4 text-center cursor-pointer block text-white"
      >
        Already have an account? Click here to login.
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import Input from "@/components/ui/Input.vue";

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
