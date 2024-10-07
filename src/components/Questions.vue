<template>
  <h1 class="text-4xl font-bold mt-4 md:mt-0">
    FinTrack <i class="fa-solid fa-chart-pie"></i>
  </h1>
  <div
    class="bg-gray-800 shadow-md rounded-lg p-6 max-w-md mx-5 my-5 md:mx-auto md:w-full md:p-8"
  >
    <h2 class="text-2xl font-semibold mb-6 text-center">Finance Questions</h2>
    <p class="text-center md:text-left">
      To provide you with help and advice, we first need you to answer some
      questions about your personal finances.
    </p>
    <form class="mt-5" @submit.prevent="handleSubmit">
      <h2 class="text-xl font-semibold text-center mb-2">Income</h2>
      <Input
        label="Monthly Income (£)"
        id="monthly-income"
        v-model="monthlyIncome"
        type="number"
      />
      <div class="mt-5">
        <h2 class="text-xl font-semibold text-center mb-2">Expenses</h2>
        <Input
          label="Expense Name"
          id="expense-name"
          v-model="newExpenseName"
          type="text"
        />
        <Input
          label="Expense Amount (£)"
          id="expense-amount"
          v-model="newExpenseAmount"
          type="number"
        />
        <button
          type="button"
          @click="addExpense"
          class="mt-4 w-full flex items-center justify-center py-2 px-4 bg-gray-900 hover:bg-gray-700 text-white font-semibold rounded-md shadow transition duration-150"
        >
          <i class="fa-solid fa-plus mr-2"></i> Add Expense
        </button>
      </div>
      <ul class="mt-4">
        <li
          v-for="(expense, index) in expenses"
          :key="index"
          class="flex justify-between text-white"
        >
          <span>{{ expense.name }}</span>
          <span>£{{ expense.amount }}</span>
        </li>
      </ul>
      <button
        type="submit"
        class="w-full py-2 px-4 bg-gray-900 hover:bg-gray-700 text-white font-semibold rounded-md shadow transition duration-150 mt-5"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Input from "./Input.vue";

const monthlyIncome = ref<number | null>(null);
const newExpenseName = ref<string>("");
const newExpenseAmount = ref<number | null>(null);
const expenses = ref<{ name: string; amount: number }[]>([]);

const addExpense = () => {
  if (newExpenseName.value.trim() !== "" && newExpenseAmount.value !== null) {
    expenses.value.push({
      name: newExpenseName.value,
      amount: newExpenseAmount.value,
    });
    newExpenseName.value = "";
    newExpenseAmount.value = null;
  }
};

const handleSubmit = () => {
  console.log(`Monthly Income: £${monthlyIncome.value}`);
  console.log("Expenses: ", expenses.value);
};
</script>
