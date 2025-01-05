<template>
  <div class="bg-zinc-800 rounded-lg p-6 shadow-lg mt-4">
    <h2 class="text-2xl font-semibold mb-4 text-center">Financial Goals</h2>
    <ul class="space-y-4">
      <li v-for="(goal) in computedFinancialGoals" :key="goal.id">
        <div class="flex justify-between mb-2">
          <span>{{ goal.saving_name }}</span>
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
import {ref, computed} from "vue";
import {useAuthStore} from "@/stores/auth";
import {Pot} from "@/types/Pot";

const authStore = useAuthStore();
const financialGoals = ref<Pot[]>(authStore.user?.savings || []);

const computedFinancialGoals = computed(() =>
    financialGoals.value.map((goal) => ({
      ...goal,
      progress: Math.min(
          (parseFloat(goal.saving_amount) / parseFloat(goal.saving_goal)) * 100,
          100
      ).toFixed(2),
    }))
);
</script>
