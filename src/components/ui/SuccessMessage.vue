<template>
  <div
      v-if="successMessageVisible"
      class="bg-green-500 text-white p-4 mb-4 rounded-md text-center"
  >
    {{ message }}
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  message: string,
  successMessageVisible: boolean,
}>();
</script>