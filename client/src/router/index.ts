import {
  createRouter,
  createWebHistory,
  type NavigationGuardWithThis
} from 'vue-router'
import HomeView from '../views/HomeView.vue'

const verifySavedName: NavigationGuardWithThis<unknown> = (to, from, next) => {
  const savedProfile = localStorage.getItem('profile')
  if (savedProfile) {
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
      path: '/player',
      name: 'player',
      component: () => import('../views/PlayerView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue')
    }
  ]
})

export default router
