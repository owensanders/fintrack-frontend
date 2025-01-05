<template>
  <NavBar/>
  <div class="flex">
    <SideBar/>
    <div class="flex-grow p-8 bg-black text-white">
      <h1 class="text-3xl mb-6">Budget Manager</h1>
      <div class="bg-zinc-800 rounded-lg p-6">
        <h2 class="text-2xl mb-6">Budget Overview</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-zinc-700 rounded-lg p-4 text-center">
            <i class="fas fa-money-bill-wave text-3xl text-green-400 mb-2"></i>
            <h3 class="text-lg font-medium">Monthly Income</h3>
            <p class="text-2xl font-semibold mt-2">£{{ monthlyIncome }}</p>
          </div>
          <div class="bg-zinc-700 rounded-lg p-4 text-center">
            <i class="fas fa-wallet text-3xl text-red-400 mb-2"></i>
            <h3 class="text-lg font-medium">Total Expenses</h3>
            <p class="text-2xl font-semibold mt-2">£{{ totalExpenses }}</p>
          </div>
          <div class="bg-zinc-700 rounded-lg p-4 text-center">
            <i class="fas fa-coins text-3xl text-yellow-400 mb-2"></i>
            <h3 class="text-lg font-medium">Remaining</h3>
            <p class="text-2xl font-bold mt-2">£{{ remainingAmount }}</p>
          </div>
        </div>
      </div>
      <div class="bg-zinc-800 rounded-lg p-6 mt-6">
        <h2 class="text-2xl mb-4">Expenses Breakdown</h2>
        <ul v-if="expenses.length > 0" class="divide-y divide-zinc-700">
          <li v-for="expense in expenses" class="py-3 flex justify-between" :key="expense.id">
            <span>{{ expense.expense_name }}</span><span class="font-semibold">£{{ expense.expense_amount }}</span>
          </li>
        </ul>
        <p v-else>You don't currently have any expenses listed, visit the Manage Expenses page to add some.</p>
      </div>
      <div v-if="remainingAmount > 0" class="bg-zinc-800 rounded-lg p-6 mt-6">
        <h2 class="text-2xl mb-4">Remaining Money</h2>
        <p class="my-2 text-lg">We suggest with the left over money first allocating some to your savings goals:</p>
        <ul class="list-disc pl-5">
          <li v-for="saving in savings" :key="saving.id">{{ saving.saving_name }}</li>
        </ul>
        <p class="mt-2 text-lg">
          Finally, any left overs can be used as free spending money to be spent on anything you would like.
          But remember this money is to last the whole month and doesn't have to be spent for the sake of it.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import NavBar from "./ui/NavBar.vue";
import SideBar from "./ui/SideBar.vue";
import {useAuthStore} from "@/stores/auth";
import {UserExpenseData} from "@/types/UserExpenseData";

const authStore = useAuthStore();
const expenses = computed<UserExpenseData[]>(() => authStore.user?.expenses ?? []);
const monthlyIncome = computed<number>(() => authStore.user?.monthly_income ?? 0);
const totalExpenses = computed<number>(() => authStore.user?.expense_total_amount ?? 0);
const remainingAmount = computed<number>(() => monthlyIncome.value - totalExpenses.value);
const savings = ref(authStore.user?.savings || []);
</script>
