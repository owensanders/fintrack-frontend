<template>
  <div
    class="bg-gray-700 rounded-lg p-6 shadow-lg mt-8 flex flex-col items-center justify-center"
  >
    <h2 class="text-2xl font-semibold mb-4 text-center">
      Ask our finance AI helper a question
    </h2>
    <form @submit.prevent="submitQuestion" class="w-full">
      <textarea
        v-model="question"
        placeholder="Type your question here..."
        class="w-full p-4 rounded-md border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="4"
      ></textarea>
      <button
        type="submit"
        class="mt-4 w-full py-2 px-4 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition"
      >
        Ask
      </button>
    </form>
    <div
      v-if="answer"
      class="mt-6 bg-gray-800 p-4 rounded-md shadow-md w-full text-center text-gray-300"
    >
      <h3 class="text-xl font-semibold text-white">Answer:</h3>
      <p class="mt-2">{{ answer }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const question = ref("");
const answer = ref<string | null>(null);

const submitQuestion = async () => {
  if (!question.value.trim()) return;

  // Simulate an API response with a mock answer for now
  answer.value = `This is a mock answer for the question: "${question.value}"`;
  question.value = "";
};
</script>

<style scoped>
.ask-question-section {
  max-width: 600px;
  margin: 0 auto;
}
</style>
