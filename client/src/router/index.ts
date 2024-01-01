import AppLayout from '@/components/layouts/AppLayout.vue'
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

const verifyLogin: NavigationGuardWithThis<unknown> = (to, from, next) => {
  const savedProfile = localStorage.getItem('profile')
  if (savedProfile && to.name === 'login') {
    return next({ name: 'search' })
  }
  next()
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
          path: '',
          name: 'search',
          component: () => import('../views/SearchView.vue')
        },
        {
          path: 'queue',
          name: 'queue',
          component: () => import('../views/QueueView.vue')
        },
        {
          path: 'controls',
          name: 'controls',
          component: () => import('../views/ControlsView.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      beforeEnter: [verifyLogin]
    },
    {
      path: '/player',
      name: 'player',
      component: () => import('../views/PlayerView.vue')
    },
  ]
})

export default router
