import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/indexView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: IndexView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title : 'Login'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    // {
    //   path: '/:pathMatch(.*)*',
    //   name: 'not-found',
    //   component: () => import('../views/FormView.vue')
    // }
    {
      path: '/form',
      name: 'form',
      component: () => import('../views/FormView.vue'),
    }
  ]
})

router.beforeEach((to, from, next) => {
  const pageTitle = to.meta.title;
  if (pageTitle) {
    document.title = pageTitle;
  }
  next();
});

export default router
