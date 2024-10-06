<template>
  <div class="mb-4">
    <label :for="id" class="font-medium">{{ label }}</label>
    <input
      :type="type"
      :id="id"
      :value="modelValue"
      @input="updateValue"
      required
      class="mt-1 w-full border-gray-600 bg-gray-700 text-white rounded-md shadow-sm p-1"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
  label: string;
  id: string;
  modelValue: string;
  type: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>
