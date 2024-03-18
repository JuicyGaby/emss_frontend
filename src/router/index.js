import { createRouter, createWebHistory } from "vue-router";
import IndexView from "../views/indexView.vue";
import LoginView from "../views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: IndexView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: {
        title: "Login",
      },
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/form",
      name: "form",
      component: () => import("../views/FormView.vue"),
    },
    {
      path: "/patients",
      name: "patients",
      component: () => import("../views/PatientsView.vue"),
    },
    {
      path: "/EditPatient/:id",
      name: "editPatient",
      component: () => import("../components/patient/EditPatient.vue"),
    },
    {
      path: "/daily-activity-report",
      name: "dailyActivityReport",
      component: () => import("../views/DailyActivityReportView.vue"),
      meta: {
        title: "Daily Activity Report",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const pageTitle = to.meta.title;
  if (pageTitle) {
    document.title = pageTitle;
  }
  next();
});

export default router;
