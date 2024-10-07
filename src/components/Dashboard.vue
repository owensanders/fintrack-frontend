<template>
  <NavBar />
  <div class="p-8 bg-gray-800 text-white">
    <h1 class="text-3xl">Welcome, John Doe...</h1>
    <p class="my-6 text-center md:text-left">
      This dashboard provides a comprehensive overview of your financial health.
      Here, you can visualise your income and expenses, track your financial
      goals, and gain insights through helpful finance tips. Explore the data to
      manage your finances effectively and make informed decisions. Also, ask
      our AI finance helper a finance related question for a instant response!
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <FinanceTips />
      <div
        class="bg-gray-700 rounded-lg p-6 shadow-lg flex flex-col items-center justify-center"
      >
        <h2 class="text-2xl font-semibold mb-4">Income vs Expenses</h2>
        <PieChart :income="monthlyIncome" :expenses="totalExpenses" />
      </div>
    </div>
    <FinancialGoals />
    <AskAQuestion />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PieChart from "./PieChart.vue";
import NavBar from "./ui/NavBar.vue";
import AskAQuestion from "./AskAQuestion.vue";
import FinancialGoals from "./FinancialGoals.vue";
import FinanceTips from "./FinanceTips.vue";

const monthlyIncome = ref(4000);
const totalExpenses = ref(2500);
</script>
