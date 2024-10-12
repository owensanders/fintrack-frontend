<template>
  <NavBar />
  <div class="flex">
    <SideBar />
    <div class="flex-grow p-8 bg-black text-white">
      <h1 class="text-3xl mb-3">Manage Expenses</h1>
      <div class="bg-zinc-800 rounded-lg p-6">
        <form @submit.prevent="handleSaveExpense">
          <Input
            label="Expense Name"
            id="name"
            type="text"
            v-model="newExpense.name"
            :is-required="true"
          />
          <Input
            label="Amount"
            id="amount"
            type="number"
            v-model="newExpense.amount"
            :is-required="true"
          />
          <button
            type="submit"
            class="w-full bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md mt-4"
          >
            {{ editingExpense ? "Update Expense" : "Add Expense" }}
          </button>
        </form>
        <div class="mt-8">
          <h2 class="text-2xl mb-4">Expense List</h2>
          <ul>
            <li
              v-for="(expense, index) in expenses"
              :key="index"
              class="bg-gray-700 p-4 rounded mb-4 flex justify-between items-center"
            >
              <div>
                <h3 class="font-semibold">{{ expense.name }}</h3>
                <p>Amount: £{{ expense.amount }}</p>
              </div>
              <div class="flex space-x-4">
                <button
                  @click="editExpense(index)"
                  class="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button
                  @click="deleteExpense(index)"
                  class="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import NavBar from "./ui/NavBar.vue";
import SideBar from "./ui/SideBar.vue";
import Input from "./ui/Input.vue";
import { Expense } from "@/interfaces/Expense";

const expenses = ref<Expense[]>([
  { name: "Rent", amount: 1200 },
  { name: "Groceries", amount: 300 },
]);

const newExpense = ref<Expense>({
  name: "",
  amount: null,
});

const editingExpense = ref(false);
const currentIndex = ref(-1);

const handleSaveExpense = () => {
  if (editingExpense.value) {
    expenses.value[currentIndex.value] = { ...newExpense.value };
    editingExpense.value = false;
  } else {
    expenses.value.push({ ...newExpense.value });
  }
  newExpense.value = { name: "", amount: null };
};

const editExpense = (index: number) => {
  currentIndex.value = index;
  newExpense.value = { ...expenses.value[index] };
  editingExpense.value = true;
};

const deleteExpense = (index: number) => {
  expenses.value.splice(index, 1);
};
</script>
