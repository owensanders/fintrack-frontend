<template>
  <div class="bg-zinc-800 rounded-lg p-6 shadow-lg mt-4">
    <h2 class="text-2xl font-semibold mb-4 text-center">Financial Goals</h2>
    <ul class="space-y-4">
      <li v-for="(goal, index) in financialGoals" :key="index">
        <div class="flex justify-between mb-2">
          <span>{{ goal.title }}</span>
          <span>{{ goal.progress }}%</span>
        </div>
        <div class="w-full bg-gray-600 rounded-full h-2">
          <div
            class="bg-green-400 h-2 rounded-full"
            :style="{ width: goal.progress + '%' }"
          ></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { FinanceGoal } from "@/types/FinancialGoal";
import { ref } from "vue";

const financialGoals = ref<FinanceGoal[]>([
  { title: "Emergency Fund", progress: 60 },
  { title: "Holiday Savings", progress: 25 },
  { title: "New Laptop Fund", progress: 40 },
]);
</script>
