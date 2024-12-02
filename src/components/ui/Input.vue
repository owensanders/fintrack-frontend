<template>
  <div class="mb-4">
    <label :for="id" class="font-medium">
      <span v-if="isRequired" class="text-red-500">* </span>{{ label }}
    </label>
    <input
        :type="type"
        :id="id"
        :value="modelValue"
        @input="updateValue"
        :class="['mt-1', 'w-full', 'border-gray-600', 'bg-zinc-700', 'text-white', 'rounded-md', 'shadow-sm', 'p-1', inputClasses]"
        :placeholder="placeholder"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
  label?: string;
  id: string;
  modelValue: string | number | null | undefined;
  type: string;
  isRequired?: boolean;
  placeholder?: string;
  inputClasses?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number | null): void;
}>();

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>
