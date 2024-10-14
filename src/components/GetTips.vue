<template>
  <NavBar />
  <div class="flex">
    <SideBar />
    <div class="flex-grow p-8 bg-black text-white">
      <h1 class="text-3xl mb-3">Get Tips</h1>
      <div class="bg-zinc-800 rounded-lg p-6">
        <h2 class="text-2xl mb-4">Here are some financial tips for you:</h2>
        <ul class="list-disc pl-5 space-y-2">
          <li v-for="(tip, index) in tips" :key="index" class="text-lg">
            {{ tip }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import NavBar from "./ui/NavBar.vue";
import SideBar from "./ui/SideBar.vue";

const tips = ref<string[]>([
  "Create a budget and track your spending to find areas to cut back.",
  "Consider saving at least 20% of your monthly income.",
  "Set aside an emergency fund to cover unexpected expenses.",
  "Invest in low-risk savings options such as ISAs or high-interest accounts.",
  "Limit unnecessary subscriptions or memberships to save money.",
  "Pay off high-interest debts first to reduce long-term financial burdens.",
  "Take advantage of employer retirement contributions or matching programs.",
  "Regularly review and adjust your financial goals based on your progress.",
  "Shop around for better deals on insurance, utilities, and services.",
  "Look for opportunities to boost your income through side gigs or freelancing.",
]);
</script>
