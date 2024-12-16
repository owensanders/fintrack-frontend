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
      <div class="bg-zinc-800 rounded-lg p-6 mt-6 shadow-md">
        <h2 class="text-2xl font-semibold mb-6 text-center border-b border-zinc-700 pb-4">Left Over Allocations</h2>
        <form @submit.prevent="allocateFunds" class="space-y-6">
          <div class="flex flex-col">
            <Input
                label="Allocation name"
                id="allocation-name"
                v-model="allocationName"
                type="text"
                :is-required="true"
            />
          </div>
          <div class="flex flex-col">
            <Input
                label="Amount"
                id="allocation-amount"
                v-model="allocationAmount"
                type="number"
                :is-required="true"
            />
          </div>
          <div class="text-right">
            <button
                type="submit"
                class="bg-green-500 hover:bg-green-600 transition text-white font-semibold rounded-md px-6 py-2"
            >
              Allocate Funds
            </button>
          </div>
        </form>
        <div class="border-t border-zinc-700 mt-6 pt-6">
          <div class="flex justify-between items-center mb-6">
            <div>
              <h3 class="text-lg font-medium">Unallocated</h3>
              <p class="text-2xl font-semibold text-yellow-400 mt-2">£2750</p>
            </div>
            <i class="fas fa-chart-pie text-4xl text-green-500"></i>
          </div>
        </div>
        <div>
          <h3 class="text-lg font-medium border-b border-zinc-700 pb-3 mb-4">Current Allocations</h3>
          <ul v-if="alllocations.length > 0" class="space-y-4">
            <li
                v-for="(allocation, index) in allocations"
                :key="index"
                class="flex justify-between items-center bg-zinc-700 rounded-lg p-4"
            >
              <div>
                <p class="text-lg font-semibold">{{ allocation.name }}</p>
                <p class="text-sm text-zinc-400">£{{ allocation.amount }}</p>
              </div>
              <button
                  @click="removeAllocation(index)"
                  class="bg-red-500 hover:bg-red-600 text-white font-medium rounded-md px-4 py-2 text-sm"
              >
                Remove
              </button>
            </li>
          </ul>
          <p v-else>You don't currently have any allocations, add some using the form above.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from "vue";
import NavBar from "./ui/NavBar.vue";
import SideBar from "./ui/SideBar.vue";
import Input from "./ui/Input.vue";
import {useAuthStore} from "@/stores/auth";
import {UserExpenseData} from "@/types/UserExpenseData";

const authStore = useAuthStore();
const allocationName = ref('');
const allocationAmount = ref<number | null>(null);
const alllocations = ref([]);

const expenses = computed<UserExpenseData[]>(() => authStore.user?.expenses ?? []);
const monthlyIncome = computed<number>(() => authStore.user?.monthly_income ?? 0);
const totalExpenses = computed<number>(() => authStore.user?.expense_total_amount ?? 0);
const remainingAmount = computed<number>(() => monthlyIncome.value - totalExpenses.value);

const allocateFunds = () => {
  console.log(`Allocating ${allocationAmount.value} to ${allocationName.value}`);
};
</script>
