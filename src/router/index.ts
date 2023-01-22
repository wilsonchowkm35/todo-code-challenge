import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/HomeView.vue";
import Board from "../pages/BoardView.vue";

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

export default router;
