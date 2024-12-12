<template>
  <nav class="bg-zinc-800 shadow-lg p-4">
    <div class="mx-auto flex items-center justify-between">
      <div class="text-white text-2xl font-bold md:mr-auto flex items-center">
        <i class="fa-solid fa-chart-pie mr-2 text-green-500"></i> FinTrack
      </div>
      <div class="hidden md:flex items-center space-x-4">
        <div
          class="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-lg font-semibold"
        >
          {{ getInitials(authStore.user.name) }}
        </div>
      </div>
      <button
        @click="isMenuOpen = !isMenuOpen"
        class="block text-white md:hidden focus:outline-none"
      >
        <i class="fa-solid fa-bars"></i>
      </button>
    </div>
    <div v-if="isMenuOpen" class="md:hidden mt-4">
      <ul class="flex flex-col space-y-4 text-white text-lg">
        <li>
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
        <li>
          <router-link to="/my-profile">My Profile</router-link>
        </li>
        <li>
          <router-link to="/manage-expenses">Manage Expenses</router-link>
        </li>
        <li>
          <router-link to="/savings-investments">
            Saving And Investments
          </router-link>
        </li>
        <li>
          <router-link to="/budget-manager">Budget Manager</router-link>
        </li>
        <li @click="handleLogout">
          <router-link to="/">Logout</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { logout } from "@/services/authService";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const isMenuOpen = ref(false);
const authStore = useAuthStore();
const router = useRouter();

const handleLogout = async () => {
  try {
    await logout();
    authStore.logout();

    router.push("/login");
  } catch (error) {
    console.error("Logout failed", error);
  }
};

const getInitials = (name: string | null | undefined): string => {
  if (!name) return '';
  const nameParts = name.split(' ');
  const firstInitial = nameParts[0]?.charAt(0).toUpperCase() || '';
  const secondInitial = nameParts[1]?.charAt(0).toUpperCase() || '';
  return firstInitial + secondInitial;
};

</script>
