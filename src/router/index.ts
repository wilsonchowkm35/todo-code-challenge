import { createRouter, createWebHistory } from "vue-router";
import { useAuthService } from "../machines/auth";
import Home from "../pages/HomeView.vue";
import Board from "../pages/BoardView.vue";

const { state } = useAuthService();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/board",
      name: "board",
      component: Board,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name !== "home" && state.value.value !== "loggedIn") {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
