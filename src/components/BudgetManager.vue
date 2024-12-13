<template>
  <NavBar/>
  <div class="flex">
    <SideBar/>
    <div class="flex-grow p-8 bg-black text-white">
      <h1 class="text-3xl mb-6">Budget Manager</h1>
      <div class="bg-zinc-800 rounded-lg p-6">
        <h2 class="text-2xl mb-4">Budget Overview</h2>
        <div class="grid grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-medium">Monthly Income</h3>
            <p class="text-2xl font-semibold">£{{ monthlyIncome }}</p>
          </div>
          <div>
            <h3 class="text-lg font-medium">Total Expenses</h3>
            <p class="text-2xl font-semibold">£{{ totalExpenses }}</p>
          </div>
        </div>
        <div class="border-t border-zinc-700 pt-4 mt-6">
          <h3 class="text-lg font-medium">Remaining</h3>
          <p class="text-2xl font-bold text-green-500">£{{ remainingAmount }}</p>
        </div>
      </div>
      <div class="bg-zinc-800 rounded-lg p-6 mt-6">
        <h2 class="text-2xl mb-4">Expenses Breakdown</h2>
        <ul class="divide-y divide-zinc-700">
          <li v-for="expense in expenses" class="py-3 flex justify-between" :key="expense.id">
            <span>{{ expense.expense_name }}</span><span class="font-semibold">£{{ expense.expense_amount }}</span>
          </li>
        </ul>
      </div>
      <div class="bg-zinc-800 rounded-lg p-6 mt-6">
        <h2 class="text-2xl mb-4">Left Over Allocations</h2>
        <form @submit.prevent="allocateFunds" class="space-y-4">
          <div>
            <Input
                id="allocation-name"
                v-model="allocationName"
                label="Allocation Name"
                type="text"
                input-classes="p-2 w-full"
                :is-required="true"
            />
          </div>
          <div>
            <Input
                id="allocation-amount"
                v-model="allocationAmount"
                label="Amount"
                type="number"
                input-classes="p-2 w-full"
                :is-required="true"
            />
          </div>
          <div>
            <button
                type="submit"
                class="bg-green-500 hover:bg-green-600 transition text-white font-semibold rounded-md px-4 py-2 w-full sm:w-auto"
            >
              Allocate Funds
            </button>
          </div>
        </form>
        <div class="mt-6">
          <h3 class="text-lg font-medium">Unallocated</h3>
          <p class="text-2xl font-semibold">£2750</p>
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

const expenses = computed<UserExpenseData[]>(() => authStore.user?.expenses ?? []);
const monthlyIncome = computed<number>(() => authStore.user?.monthly_income ?? 0);
const totalExpenses = computed<number>(() => authStore.user?.expense_total_amount ?? 0);
const remainingAmount = computed<number>(() => monthlyIncome.value - totalExpenses.value);

const allocateFunds = () => {
  console.log(`Allocating ${allocationAmount.value} to ${allocationName.value}`);
};
</script>
