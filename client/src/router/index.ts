import { createRouter, createWebHistory, type NavigationGuardWithThis } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const verifySavedName: NavigationGuardWithThis<unknown> = (to, from, next) => {
  const savedName = localStorage.getItem('name')
  if (savedName) {
    next()
  } else {
    next({ name: 'login' })
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: [verifySavedName]
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

export default router