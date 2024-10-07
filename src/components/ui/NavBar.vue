<template>
  <nav class="bg-gray-900 shadow-lg p-4">
    <div class="mx-auto flex items-center justify-between">
      <div class="text-white text-4xl font-bold md:mr-auto flex items-center">
        <i class="fa-solid fa-chart-pie mr-2"></i> FinTrack
      </div>
      <button
        @click="isMenuOpen = !isMenuOpen"
        class="block text-white md:hidden focus:outline-none"
      >
        <i class="fa-solid fa-bars"></i>
      </button>
      <ul class="hidden md:flex space-x-8 text-white text-lg">
        <li
          :class="{ active: isActiveRoute('/dashboard') }"
          class="transition duration-300 hover:text-gray-600 p-2"
        >
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
        <li
          :class="{ active: isActiveRoute('/profile') }"
          class="transition duration-300 hover:text-gray-600 p-2"
        >
          <router-link to="/profile">My Profile</router-link>
        </li>
        <li
          :class="{ active: isActiveRoute('/manage-expenses') }"
          class="transition duration-300 hover:text-gray-600 p-2"
        >
          <router-link to="/manage-expenses">Manage Expenses</router-link>
        </li>
        <li
          :class="{ active: isActiveRoute('/logout') }"
          class="transition duration-300 hover:text-gray-600 p-2"
        >
          <router-link to="/logout">Logout</router-link>
        </li>
      </ul>
    </div>
    <div v-if="isMenuOpen" class="md:hidden mt-4">
      <ul class="flex flex-col space-y-4 text-white text-lg">
        <li>
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
        <li>
          <router-link to="/profile">My Profile</router-link>
        </li>
        <li>
          <router-link to="/manage-expenses">Manage Expenses</router-link>
        </li>
        <li>
          <router-link to="/get-tips">Get Tips</router-link>
        </li>
        <li>
          <router-link to="/logout">Logout</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

const isMenuOpen = ref(false);
const route = useRoute();
const isActiveRoute = (path: string): boolean => {
  return route.path === path;
};
</script>
