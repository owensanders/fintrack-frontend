<template>
  <ul v-if="Object.keys(errors).length > 0" class="mb-4 text-red-600 text-center">
    <li v-for="(errorMessages, field) in errors" :key="field">
      <ul>
        <li v-for="(message, index) in errorMessages" :key="`${field}-error-${index}`">
          {{ message }}
        </li>
      </ul>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { Errors } from "@/types/Errors";

const props = defineProps<{
  errors: Errors
}>();

</script>
