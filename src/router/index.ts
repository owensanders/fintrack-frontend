import { createRouter, createWebHistory } from "vue-router";
import Login from "@/components/auth/Login.vue";
import Register from "@/components/auth/Register.vue";
import Questions from "@/components/Questions.vue";
import Dashboard from "@/components/Dashboard.vue";
import MyProfile from "@/components/MyProfile.vue";
import ManageFinances from "@/components/ManageFinances.vue";
import SavingsAndInvestments from "@/components/SavingsAndInvestments.vue";
import GetTips from "@/components/GetTips.vue";

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
    path: "/manage-finances",
    name: "manage-finances",
    component: ManageFinances,
  },
  {
    path: "/savings-investments",
    name: "savings-investments",
    component: SavingsAndInvestments,
  },
  {
    path: "/get-tips",
    name: "get-tips",
    component: GetTips,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
