<template>
  <NavBar />
  <div class="flex">
    <SideBar />
    <div class="flex-grow p-8 bg-black text-white">
      <h1 class="text-3xl mb-3">My Profile</h1>
      <div class="bg-zinc-800 rounded-lg p-6">
        <form @submit.prevent="handleUpdate">
          <Input
            label="Email"
            id="email"
            type="email"
            v-model="email"
            required
            :is-required="true"
          />
          <Input
            label="First name"
            id="first-name"
            type="text"
            v-model="firstName"
            required
            :is-required="true"
          />
          <Input
            label="Last name"
            id="last-name"
            type="text"
            v-model="lastName"
            required
            :is-required="true"
          />
          <div class="flex justify-center md:justify-start">
            <button
              type="submit"
              class="w-full py-2 px-4 mt-3 bg-green-500 hover:bg-gray-700 text-white font-semibold rounded-md shadow transition duration-150"
            >
              Update profile
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from "./ui/NavBar.vue";
import SideBar from "./ui/SideBar.vue";
import Input from "./ui/Input.vue";
import { ref } from "vue";

const email = ref("");
const firstName = ref("");
const lastName = ref("");

const handleUpdate = () => {
  console.log(
    `Email: ${email.value}, First name: ${firstName.value}, Last name: ${lastName.value}`
  );
};
</script>
