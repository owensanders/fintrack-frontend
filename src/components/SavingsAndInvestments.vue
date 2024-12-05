<template>
  <NavBar />
  <div class="flex">
    <SideBar />
    <div class="flex-grow p-8 bg-black text-white">
      <h1 class="text-3xl mb-3">Savings and Investments</h1>
      <div class="bg-zinc-800 rounded-lg p-6">
        <form @submit.prevent="handleSavePot">
          <Input
              label="Pot Name"
              id="pot-name"
              type="text"
              v-model="newPot.name"
              :is-required="true"
          />
          <Input
              label="Amount"
              id="pot-amount"
              type="number"
              v-model="newPot.amount"
              :is-required="true"
          />
          <Input
              label="Goal (Optional)"
              id="pot-goal"
              type="number"
              v-model="newPot.goal"
              :is-required="false"
          />
          <button
              type="submit"
              class="w-full bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md mt-4"
          >
            {{ editingPot ? "Update Pot" : "Add Pot" }}
          </button>
        </form>
      </div>
      <div class="bg-zinc-800 rounded-lg p-6 mt-4">
        <div>
          <h2 class="text-2xl mb-4">Pot List</h2>
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li
              v-for="(pot, index) in pots"
              :key="index"
              class="bg-zinc-700 p-4 rounded flex justify-between items-center"
            >
              <div>
                <h3 class="font-semibold">{{ pot.name }}</h3>
                <p>Amount: £{{ pot.amount }}</p>
                <p v-if="pot.goal">Goal: £{{ pot.goal }}</p>
              </div>
              <div class="flex space-x-4">
                <button
                  @click="editPot(index)"
                  class="bg-green-500 hover:bg-gray-800 transition text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button
                  @click="deletePot(index)"
                  class="border-2 border-green-500 hover:border-gray-800 transition text-white px-4 py-2 rounded"
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
import { Pot } from "@/types/Pot";

const pots = ref<Pot[]>([
  { name: "Emergency Fund", amount: 5000, goal: 10000 },
  { name: "Retirement Fund", amount: 15000 },
]);

const newPot = ref<Pot>({
  name: "",
  amount: null,
  goal: null,
});

const editingPot = ref(false);
const currentIndex = ref(-1);

const handleSavePot = () => {
  if (editingPot.value) {
    pots.value[currentIndex.value] = { ...newPot.value };
    editingPot.value = false;
  } else {
    pots.value.push({ ...newPot.value });
  }
  resetForm();
};

const editPot = (index: number) => {
  currentIndex.value = index;
  newPot.value = { ...pots.value[index] };
  editingPot.value = true;
};

const deletePot = (index: number) => {
  pots.value.splice(index, 1);
  resetForm();
};

const resetForm = () => {
  newPot.value = { name: "", amount: null, goal: null };
  currentIndex.value = -1;
  editingPot.value = false;
};
</script>
