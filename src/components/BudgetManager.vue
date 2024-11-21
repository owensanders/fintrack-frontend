<template>
  <NavBar />
  <div class="flex">
    <SideBar />
    <div class="flex-grow p-8 bg-black text-white">
      <h1 class="text-3xl mb-3">Budget Manager</h1>
      <div class="bg-zinc-800 rounded-lg p-6">
        <div class="mb-6">
          <div class="mb-3">
            <h2 class="text-lg">Monthly Income: £5000</h2>
          </div>
          <div>
            <h2 class="text-lg">Total Expenses: £2250</h2>
          </div>
        </div>

        <div class="border-t border-zinc-700 pt-4 mt-6">
          <h2 class="text-lg mb-2">Expenses Breakdown</h2>
          <ul class="space-y-2">
            <li class="flex justify-between">
              <span>Rent</span><span>£1500</span>
            </li>
            <li class="flex justify-between">
              <span>Utilities</span><span>£200</span>
            </li>
            <li class="flex justify-between">
              <span>Groceries</span><span>£400</span>
            </li>
            <li class="flex justify-between">
              <span>Transportation</span><span>£150</span>
            </li>
          </ul>
        </div>

        <div class="border-t border-zinc-700 mt-6 pt-4">
          <h2 class="text-lg">Remaining:</h2>
          <p class="text-xl font-semibold">£2750</p>
        </div>
      </div>

      <div class="bg-zinc-800 rounded-lg p-6 mt-6">
        <h1 class="text-2xl mb-3">Allocations</h1>
        <div class="flex space-x-4">
          <Input
              id="allocation-name"
              v-model="allocationName"
              label="Allocation Name"
              type="text"
              placeholder="Enter allocation name"
              input-classes="p-2"
          />
          <Input
              id="allocation-amount"
              v-model="allocationAmount"
              label="Amount"
              type="number"
              placeholder="Enter amount"
              input-classes="p-2"
          />
          <button
              class="w-1/3 bg-green-500 hover:bg-gray-800 transition text-white font-semibold rounded-md mt-4"
              @click="allocateFunds">
            Allocate
          </button>
        </div>
        <div class="mt-4">
          <h3 class="text-lg">Unallocated: £2750</h3>
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

const allocationName = ref('');
const allocationAmount = ref<number | null>(null);

const allocateFunds = () => {
  console.log(`Allocating ${allocationAmount.value} to ${allocationName.value}`);
};
</script>
