import AppLayout from '@/layouts/AppLayout.vue'
import {
  createRouter,
  createWebHistory,
  type NavigationGuardWithThis
} from 'vue-router'

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
      component: AppLayout,
      beforeEnter: [verifySavedName],
      children: [
        {
          path: 'profile',
          name: 'profile',
          component: () => import('../views/ProfileView.vue')
        },
        {
          path: 'player',
          name: 'player',
          component: () => import('../views/PlayerView.vue')
        },
        {
          path: '',
          name: '',
          component: () => import('../views/SearchView.vue')
        },
        {
          path: 'queue',
          name: 'queue',
          component: () => import('../views/QueueView.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

export default router
