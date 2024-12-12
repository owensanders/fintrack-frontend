<template>
  <NavBar />
  <div class="flex">
    <SideBar />
    <div class="flex-grow p-8 bg-black text-white">
      <h1 class="text-3xl mb-3">Manage Expenses</h1>
      <div
          class="bg-zinc-800 rounded-lg p-6 flex flex-col justify-center items-center md:block"
      >
        <h1 class="text-2xl mb-3">Expenses</h1>
        <SuccessMessage
            :message="successMessage"
            :success-message-visible="successMessageVisible"
        />
        <form @submit.prevent="handleSaveExpense">
          <FormErrors :errors="errors" />
          <Input
              label="Expense Name"
              id="name"
              type="text"
              v-model="newExpense.expense_name"
              :is-required="true"
          />
          <Input
              label="Expense Amount"
              id="amount"
              type="number"
              v-model="newExpense.expense_amount"
              :is-required="true"
          />
          <button
              type="submit"
              :disabled="loading"
              class="w-full bg-green-500 hover:bg-gray-800 transition text-white font-semibold py-2 px-4 rounded-md mt-4"
          >
            {{ loading ? "Processing..." : (editingExpense ? "Update Expense" : "Add Expense") }}
          </button>
        </form>
      </div>
      <div
          class="bg-zinc-800 rounded-lg p-6 flex flex-col justify-center items-center md:block mt-4"
      >
        <div>
          <h2 class="text-2xl mb-4 text-center md:text-start">Current Expenses</h2>
          <ul v-if="expenses.length > 0">
            <li
                v-for="(expense) in expenses"
                :key="expense.id"
                class="bg-zinc-700 p-4 rounded mb-4 md:flex justify-between items-center"
            >
              <div>
                <h3 class="font-semibold">{{ expense.expense_name }}</h3>
                <p>Amount: £{{ expense.expense_amount }}</p>
              </div>
              <div class="flex space-x-4 mt-1 md:mt-0">
                <button
                    @click="setExpenseToUpdate(expense.id)"
                    class="bg-green-500 hover:bg-gray-800 transition text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button
                    @click="destroyExpense(expense.id)"
                    class="border-2 border-green-500 hover:border-gray-800 transition text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          </ul>
          <p v-else>There are currently no expenses, fill out the form above to add some.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import NavBar from "./ui/NavBar.vue";
import SideBar from "./ui/SideBar.vue";
import Input from "./ui/Input.vue";
import { UserExpenseData } from "@/types/UserExpenseData";
import { useAuthStore } from "@/stores/auth";
import { Errors } from "@/types/Errors";
import {processFormErrors, resetFormErrors} from "@/utils/formHelper";
import { useRouter } from "vue-router";
import { destroy, store, update } from "@/services/userExpenseService";
import FormErrors from "@/components/ui/FormErrors.vue";
import SuccessMessage from "@/components/ui/SuccessMessage.vue";

const authStore = useAuthStore();
const router = useRouter();
const expenses = ref<UserExpenseData[]>(authStore.user?.expenses || []);
const newExpense = ref<UserExpenseData>({
  id: null,
  user_id: authStore.user?.id,
  expense_name: "",
  expense_amount: null,
});
const editingExpense = ref(false);
const errors = reactive<Errors>({
  expense_name: [],
  expense_amount: [],
});
const successMessageVisible = ref(false);
const successMessage = ref("");
const loading = ref(false);

const handleSaveExpense = async () => {
  loading.value = true;
  try {
    resetFormErrors(errors);

    if (newExpense.value.id) {
      await saveExpense(update);
      successMessage.value = "Expense successfully updated.";
    } else {
      await saveExpense(store);
      successMessage.value = "Expense successfully added.";
    }

    resetForm();
    successMessageVisible.value = true;

    setTimeout(() => {
      successMessageVisible.value = false;
      successMessage.value = "";
    }, 2000);
    await router.push("/manage-expenses");
  } catch (error: never) {
    const processedErrors = processFormErrors(error);
    if (Object.keys(processedErrors).length > 0) {
      Object.assign(errors, processedErrors);
    } else {
      errors.general = ["An unexpected error occurred. Please try again."];
      console.error("An unexpected error occurred:", error);
    }
  } finally {
    loading.value = false;
  }
};

const saveExpense = async (apiMethod: typeof store | typeof update) => {
  const response = await apiMethod(newExpense.value);
  const user = response.data;
  authStore.setUser(user);
  expenses.value = user.expenses;
  editingExpense.value = false;
};

const setExpenseToUpdate = (expenseId: number) => {
  const expenseToEdit = expenses.value.find((expense) => expense.id === expenseId);

  if (expenseToEdit) {
    newExpense.value = { ...expenseToEdit };
    editingExpense.value = true;
  } else {
    console.error("Expense not found");
  }
};

const destroyExpense = async (expenseId: number) => {
  const response = await destroy(expenseId);
  const user = response.data;

  successMessage.value = "Expense successfully deleted.";
  authStore.setUser(user);
  expenses.value = expenses.value.filter((expense) => expense.id != expenseId);
  successMessageVisible.value = true;
  resetForm();

  setTimeout(() => {
    successMessageVisible.value = false;
    successMessage.value = "";
  }, 2000);
};

const resetForm = () => {
  newExpense.value = { id: null, user_id: authStore.user?.id, expense_name: "", expense_amount: null };
  editingExpense.value = false;
}
</script>
