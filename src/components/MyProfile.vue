<template>
  <NavBar/>
  <div class="flex">
    <SideBar/>
    <div class="flex-grow p-8 bg-black text-white">
      <h1 class="text-3xl mb-3">My Profile</h1>
      <div class="bg-zinc-800 rounded-lg p-6">
        <form @submit.prevent="handleUpdate">
          <FormErrors :errors="errors" />
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
          <div class="flex justify-center md:justify-start">
            <button
                type="submit"
                class="w-full py-2 px-4 mt-3 bg-green-500 hover:bg-gray-700 text-white font-semibold rounded-md shadow transition duration-150"
            >
              Update profile
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
import { reactive, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { Errors } from "@/types/Errors";
import { resetFormErrors } from "@/utils/formHelper";
import { updateProfile } from "@/services/userService";
import { useRouter } from "vue-router";
import FormErrors from "@/components/ui/FormErrors.vue";

const authStore = useAuthStore();
const router = useRouter();
const email = ref<string | null>(authStore.user?.email || "");
const name = ref<string | null>(authStore.user?.name || "");
const errors = reactive<Errors>({
  email: [],
  password: [],
});

const handleUpdate = async() => {
  try {
    resetFormErrors(errors);

    const response = await updateProfile(authStore.user?.id, name.value, email.value);
    const user = response.data;

    authStore.setUser(user);
    router.push("/my-profile");
  } catch (error: never) {
    if (error?.response?.status === 422) {
      Object.keys(error.response.data.errors).forEach((key) => {
        errors[key] = error.response.data.errors[key];
      });
    } else {
      console.error("An unexpected error occurred:", error);
    }
  }
};
</script>
