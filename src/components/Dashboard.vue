<template>
  <NavBar />
  <div class="flex">
    <SideBar />
    <div class="flex-grow p-8 bg-black text-white">
      <h1 class="text-3xl mb-3">Dashboard</h1>
      <FinanceTips />
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FinancialGoals />
        <div
          class="bg-zinc-800 rounded-lg shadow-lg flex flex-col items-center justify-center mt-4"
        >
          <h2 class="text-2xl font-semibold mb-4">Income vs Expenses</h2>
          <PieChart :income="monthlyIncome" :expenses="totalExpenses" />
        </div>
      </div>
      <AskAQuestion />
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from "vue";
import NavBar from "./ui/NavBar.vue";
import AskAQuestion from "./AskAQuestion.vue";
import FinancialGoals from "./FinancialGoals.vue";
import FinanceTips from "./FinanceTips.vue";
import SideBar from "./ui/SideBar.vue";
import PieChart from "./ui/PieChart.vue";
import {useAuthStore} from "@/stores/auth";

const authStore = useAuthStore();
const monthlyIncome = computed<number>(() => authStore.user?.monthly_income ?? 0);
const totalExpenses = computed<number>(() => authStore.user?.expense_total_amount ?? 0);
</script>
