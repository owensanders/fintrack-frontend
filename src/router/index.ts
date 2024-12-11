import { createRouter, createWebHistory } from "vue-router";
import Login from "@/components/auth/Login.vue";
import Register from "@/components/auth/Register.vue";
import Dashboard from "@/components/Dashboard.vue";
import MyProfile from "@/components/MyProfile.vue";
import SavingsAndInvestments from "@/components/SavingsAndInvestments.vue";
import BudgetManager from "@/components/BudgetManager.vue";
import { useAuthStore } from "@/stores/auth";
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
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/my-profile",
    name: "my-profile",
    component: MyProfile,
    meta: { requiresAuth: true },
  },
  {
    path: "/manage-expenses",
    name: "manage-expenses",
    component: ManageExpenses,
    meta: { requiresAuth: true },
  },
  {
    path: "/savings-investments",
    name: "savings-investments",
    component: SavingsAndInvestments,
    meta: { requiresAuth: true },
  },
  {
    path: "/budget-manager",
    name: "budget-manager",
    component: BudgetManager,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.token !== null && authStore.user !== null;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
