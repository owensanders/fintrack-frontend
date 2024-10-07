<template>
  <div
    class="bg-gray-700 rounded-lg p-6 shadow-lg flex flex-col items-center justify-center"
  >
    <h2 class="text-2xl font-semibold mb-4 text-center">Finance Tips</h2>
    <div
      class="h-32 flex items-center justify-center text-2xl text-gray-300 text-center"
    >
      {{ currentTip }}
    </div>
    <div class="mt-4 flex justify-center">
      <button
        class="px-4 py-2 bg-gray-900 rounded-md hover:bg-gray-700 transition"
        @click="prevTip"
      >
        Previous
      </button>
      <button
        class="px-4 py-2 bg-gray-900 rounded-md ml-2 hover:bg-gray-700 transition"
        @click="nextTip"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

const currentTipIndex = ref(0);
const tips = ref<string[]>([
  "Track your expenses regularly.",
  "Create a budget and stick to it.",
  "Save at least 20% of your income.",
  "Avoid unnecessary expenses.",
  "Invest in your future early.",
]);

const currentTip = computed(() => tips.value[currentTipIndex.value]);

const nextTip = () => {
  currentTipIndex.value = (currentTipIndex.value + 1) % tips.value.length;
};

const prevTip = () => {
  currentTipIndex.value =
    (currentTipIndex.value - 1 + tips.value.length) % tips.value.length;
};

onMounted(() => {
  setInterval(() => {
    nextTip();
  }, 5000);
});
</script>
