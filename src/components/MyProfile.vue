<template>
  <NavBar/>
  <div class="flex">
    <SideBar/>
    <div class="flex-grow p-8 bg-black text-white">
      <h1 class="text-3xl mb-3">My Profile</h1>
      <div class="bg-zinc-800 rounded-lg p-6">
        <SuccessMessage
            message="Profile updated successfully."
            :success-message-visible="successMessageVisible"
        />
        <form @submit.prevent="handleUpdate">
          <FormErrors :errors="errors"/>
          <Input
              label="Email"
              id="email"
              type="email"
              v-model="email"
              :is-required="true"
          />
          <Input
              label="Name"
              id="name"
              type="text"
              v-model="name"
              :is-required="true"
          />
          <Input
              label="Monthly Income (£)"
              id="monthly-income"
              type="number"
              v-model="monthlyIncome"
              :is-required="true"
          />
          <div class="flex justify-center md:justify-start">
            <button
                type="submit"
                class="w-full py-2 px-4 mt-3 bg-green-500 hover:bg-gray-700 text-white font-semibold rounded-md shadow transition duration-150"
                :disabled="loading"
            >
              <span v-if="loading">Updating...</span>
              <span v-else>Update Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from "./ui/NavBar.vue";
import SideBar from "./ui/SideBar.vue";
import Input from "./ui/Input.vue";
import {reactive, ref} from "vue";
import {useAuthStore} from "@/stores/auth";
import {Errors} from "@/types/Errors";
import {processFormErrors, resetFormErrors} from "@/utils/formHelper";
import {updateProfile} from "@/services/userService";
import {useRouter} from "vue-router";
import FormErrors from "@/components/ui/FormErrors.vue";
import SuccessMessage from "@/components/ui/SuccessMessage.vue";

const authStore = useAuthStore();
const router = useRouter();
const email = ref<string | null>(authStore.user?.email || "");
const name = ref<string | null>(authStore.user?.name || "");
const monthlyIncome = ref<number | null>(authStore.user?.monthlyIncome || 0.00);
const errors = reactive<Errors>({
  email: [],
  password: [],
  monthly_income: [],
});
const successMessageVisible = ref(false);
const loading = ref(false);

const handleUpdate = async () => {
  loading.value = true;
  try {
    resetFormErrors(errors);

    const response = await updateProfile(authStore.user?.id, name.value, email.value, monthlyIncome.value);
    const user = response.data;

    authStore.setUser(user);
    successMessageVisible.value = true;
    setTimeout(() => {
      successMessageVisible.value = false;
    }, 2000);
    await router.push("/my-profile");
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
</script>
