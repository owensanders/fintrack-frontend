<template>
  <nav class="bg-gray-800 p-4">
    <div class="container mx-auto flex items-center justify-between">
      <div class="text-white text-2xl font-bold md:mr-auto">
        <i class="fa-solid fa-chart-pie"></i> FinTrack
      </div>
      <button
          @click="isMenuOpen = !isMenuOpen"
          class="block text-white md:hidden focus:outline-none"
      >
        <i class="fa-solid fa-bars"></i>
      </button>
      <ul
          class="hidden md:flex space-x-8 text-white text-lg"
      >
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
import {ref} from 'vue';

const isMenuOpen = ref(false);
</script>