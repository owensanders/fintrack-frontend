<template>
  <aside class="hidden md:block w-1/4 bg-black min-h-screen p-4 pr-5">
    <ul class="space-y-4 text-white text-lg mt-5">
      <li
        :class="{
          'bg-zinc-800 rounded-lg p-3 text-sm text-green-500':
            isActiveRoute('/dashboard'),
        }"
        class="hover:bg-zinc-800 p-3 text-sm rounded-lg transition duration-300"
      >
        <router-link to="/dashboard"
          ><i class="fa-solid fa-house mr-3"></i>Dashboard</router-link
        >
      </li>
      <li
        :class="{
          'bg-zinc-800 rounded-lg p-3 text-sm text-green-500':
            isActiveRoute('/my-profile'),
        }"
        class="hover:bg-zinc-800 p-3 text-sm rounded-lg transition duration-300"
      >
        <router-link to="/my-profile"
          ><i class="fa-solid fa-user mr-3"></i> My Profile</router-link
        >
      </li>
      <li
        :class="{
          'bg-zinc-800 rounded-lg p-3 text-sm text-green-500':
            isActiveRoute('/manage-expenses'),
        }"
        class="hover:bg-zinc-800 p-3 text-sm rounded-lg transition duration-300"
      >
        <router-link to="/manage-expenses"
          ><i class="fa-regular fa-money-bill-1 mr-3"></i> Manage
          Expenses</router-link
        >
      </li>
      <li
        :class="{
          'bg-zinc-800 rounded-lg p-3 text-sm text-green-500': isActiveRoute(
            '/savings-investments'
          ),
        }"
        class="hover:bg-zinc-800 p-3 text-sm rounded-lg transition duration-300"
      >
        <router-link to="/savings-investments"
          ><i class="fa-solid fa-arrow-up-right-dots mr-3"></i> Savings And
          Investments</router-link
        >
      </li>
      <li
        :class="{
          'bg-zinc-800 rounded-lg p-3 text-sm text-green-500':
            isActiveRoute('/budget-manager'),
        }"
        class="hover:bg-zinc-800 p-3 text-sm rounded-lg transition duration-300"
      >
        <router-link to="/budget-manager"
          ><i class="fa-solid fa-lightbulb mr-3"></i> Budget Manager</router-link
        >
      </li>
      <li
          :class="{
          'bg-zinc-800 rounded-lg p-3 text-sm': isActiveRoute('/logout'),
        }"
          class="hover:bg-zinc-800 p-3 text-sm rounded-lg transition duration-300"
      >
        <router-link to="/" @click.prevent="handleLogout">
          <i class="fa-solid fa-right-from-bracket mr-3"></i> Logout
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { logout } from "@/services/authService";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const handleLogout = async () => {
  try {
    await logout();
    authStore.logout();

    router.push("/login");
  } catch (error) {
    console.error("Logout failed", error);
  }
};

const isActiveRoute = (path: string): boolean => {
  return route.path === path;
};
</script>
