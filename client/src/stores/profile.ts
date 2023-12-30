import type { User } from '@/interfaces/user'
import { useFetch } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const USER_API_URL = `${import.meta.env.VITE_API_URL}/users`

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<User>()
  const createUser = async (body: Omit<User, 'id'>) => {
    return useFetch<User>(USER_API_URL).post(body).json()
  }
  const saveProfile = (user: User) => {
    profile.value = user
    localStorage.setItem('profile', JSON.stringify(user))
  }
  const getCurrentProfile = () => {
    const profile = localStorage.getItem('profile')
    if (profile) {
      return JSON.parse(profile)
    }
    return null
  }

  return { profile, createUser, getCurrentProfile, saveProfile }
})
