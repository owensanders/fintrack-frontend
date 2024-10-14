<template>
  <NavBar />
  <div class="flex">
    <SideBar />
    <div class="flex-grow p-8 bg-black text-white">
      <h1 class="text-3xl mb-3">Dashboard</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FinanceTips />
        <div
          class="bg-zinc-800 rounded-lg p-6 shadow-lg flex flex-col items-center justify-center"
        >
          <h2 class="text-2xl font-semibold mb-4">Income vs Expenses</h2>
          <PieChart :income="monthlyIncome" :expenses="totalExpenses" />
        </div>
      </div>
      <FinancialGoals />
      <AskAQuestion />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import NavBar from "./ui/NavBar.vue";
import AskAQuestion from "./AskAQuestion.vue";
import FinancialGoals from "./FinancialGoals.vue";
import FinanceTips from "./FinanceTips.vue";
import SideBar from "./ui/SideBar.vue";
import PieChart from "./ui/PieChart.vue";

const monthlyIncome = ref(4000);
const totalExpenses = ref(2500);
</script>
