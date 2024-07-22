import { createRouter, createWebHistory } from "vue-router";
import IndexView from "../views/indexView.vue";
import LoginView from "../views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: IndexView,
      meta: {
        title: "EMSS Dashboard",
      },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: {
        title: "EMSS Login",
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
      meta: {
        title: "Assessment Tool",
      },
    },
    {
      path: "/EditPatient/:id",
      name: "editPatient",
      component: () => import("../components/patient/EditPatient.vue"),
    },
    {
      path: "/dar",
      name: "dailyActivityReport",
      component: () => import("../views/DailyActivityReportView.vue"),
      meta: {
        title: "Daily Activity Report",
      },
    },
    {
      path: "/pg",
      name: "playground",
      component: () => import("../views/PlayGround.vue"),
      meta: {
        title: "Playground",
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
