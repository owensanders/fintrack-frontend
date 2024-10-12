import { createRouter, createWebHistory } from "vue-router";
import Login from "@/components/auth/Login.vue";
import Register from "@/components/auth/Register.vue";
import Questions from "@/components/Questions.vue";
import Dashboard from "@/components/Dashboard.vue";
import MyProfile from "@/components/MyProfile.vue";
import ManageExpenses from "@/components/ManageExpenses.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Login,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/questions",
    name: "questions",
    component: Questions,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "/my-profile",
    name: "my-profile",
    component: MyProfile,
  },
  {
    path: "/manage-expenses",
    name: "manage-expenses",
    component: ManageExpenses,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
