<template>
  <NavBar />
  <div class="flex">
    <SideBar />
    <div class="flex-grow p-8 bg-black text-white">
      <h1 class="text-3xl mb-3">Manage Savings</h1>
      <div class="bg-zinc-800 rounded-lg p-6 flex flex-col justify-center items-center md:block">
        <h1 class="text-2xl mb-3">Savings</h1>
        <SuccessMessage
            :message="successMessage"
            :success-message-visible="successMessageVisible"
        />
        <form @submit.prevent="handleSavePot">
          <FormErrors :errors="errors" />
          <Input
              label="Pot Name"
              id="saving_name"
              type="text"
              v-model="newPot.saving_name"
              :is-required="true"
          />
          <Input
              label="Amount"
              id="saving_amount"
              type="number"
              v-model="newPot.saving_amount"
              :is-required="true"
          />
          <Input
              label="Goal"
              id="saving_goal"
              type="number"
              v-model="newPot.saving_goal"
              :is-required="true"
          />
          <button
              type="submit"
              :disabled="loading"
              class="w-full bg-green-500 hover:bg-gray-800 transition text-white font-semibold py-2 px-4 rounded-md mt-4"
          >
            {{ loading ? "Processing..." : (editingPot ? "Update Pot" : "Add Pot") }}
          </button>
        </form>
      </div>
      <div class="bg-zinc-800 rounded-lg p-6 flex flex-col justify-center items-center md:block mt-4">
        <div>
          <h2 class="text-2xl mb-4 text-center md:text-start">Current Savings</h2>
          <ul v-if="pots && pots.length > 0">
            <li
                v-for="(pot) in pots"
                :key="pot.id"
                class="bg-zinc-700 p-4 rounded mb-4 md:flex justify-between items-center"
            >
              <div>
                <h3 class="font-semibold">{{ pot.saving_name }}</h3>
                <p>Amount: £{{ pot.saving_amount }}</p>
                <p v-if="pot.saving_goal">Goal: £{{ pot.saving_goal }}</p>
              </div>
              <div class="flex space-x-4 mt-1 md:mt-0">
                <button
                    @click="setPotToUpdate(pot.id)"
                    class="bg-green-500 hover:bg-gray-800 transition text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button
                    @click="destroyPot(pot.id)"
                    class="border-2 border-green-500 hover:border-gray-800 transition text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          </ul>
          <p v-else>There are currently no savings pots, fill out the form above to add some.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import NavBar from "./ui/NavBar.vue";
import SideBar from "./ui/SideBar.vue";
import Input from "./ui/Input.vue";
import { Pot } from "@/types/Pot";
import { useAuthStore } from "@/stores/auth";
import { Errors } from "@/types/Errors";
import { processFormErrors, resetFormErrors } from "@/utils/formHelper";
import { useRouter } from "vue-router";
import { destroy, store, update } from "@/services/userSavingsService";
import FormErrors from "@/components/ui/FormErrors.vue";
import SuccessMessage from "@/components/ui/SuccessMessage.vue";

const authStore = useAuthStore();
const router = useRouter();

const pots = ref<Pot[]>([]);
const newPot = ref<Pot>({
  id: null,
  user_id: authStore.user?.id || null,
  saving_name: "",
  saving_amount: null,
  saving_goal: null,
});
const editingPot = ref(false);
const errors = reactive<Errors>({
  saving_name: [],
  saving_amount: [],
  saving_goal: [],
});
const successMessageVisible = ref(false);
const successMessage = ref("");
const loading = ref(false);

watch(
    () => authStore.user,
    (newUser) => {
      pots.value = newUser?.savings || [];
    },
    { immediate: true }
);

const handleSavePot = async () => {
  loading.value = true;
  try {
    resetFormErrors(errors);

    if (newPot.value.id) {
      await savePot(update);
      successMessage.value = "Saving pot successfully updated.";
    } else {
      await savePot(store);
      successMessage.value = "Saving pot successfully added.";
    }

    resetForm();
    successMessageVisible.value = true;

    setTimeout(() => {
      successMessageVisible.value = false;
      successMessage.value = "";
    }, 2000);
    await router.push("/savings");
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

const savePot = async (apiMethod: typeof store | typeof update) => {
  const response = await apiMethod(newPot.value);
  const user = response.data;
  authStore.setUser(user);
  pots.value = user.savings || [];
  editingPot.value = false;
};

const setPotToUpdate = (potId: number) => {
  const potToEdit = pots.value.find((pot) => pot.id === potId);

  if (potToEdit) {
    newPot.value = { ...potToEdit };
    editingPot.value = true;
  } else {
    console.error("Pot not found");
  }
};

const destroyPot = async (potId: number) => {
  resetFormErrors(errors);
  const response = await destroy(potId);
  const user = response.data;

  successMessage.value = "Saving pot successfully deleted.";
  authStore.setUser(user);
  pots.value = user.savings || [];
  successMessageVisible.value = true;
  resetForm();

  setTimeout(() => {
    successMessageVisible.value = false;
    successMessage.value = "";
  }, 2000);
};

const resetForm = () => {
  newPot.value = {
    id: null,
    saving_name: "",
    saving_amount: null,
    saving_goal: null,
  };
  editingPot.value = false;
};
</script>
