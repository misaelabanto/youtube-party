import type { User } from '@/interfaces/user'
import { useFetch } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const USER_API_URL = `${import.meta.env.VITE_API_URL}/users`

const savedProfile = JSON.parse(localStorage.getItem('profile')!)

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<User>(savedProfile)
  const createUser = (user: Omit<User, '_id'>) =>
    useFetch<User>(USER_API_URL).post(user).json<User>()

  const updateUser = (id: string, user: Omit<User, '_id'>) =>
    useFetch<User>(`${USER_API_URL}/${id}`).patch(user).json<User>()
  const saveProfile = (user: User) => {
    profile.value = user
    localStorage.setItem('profile', JSON.stringify(user))
  }

  return { profile, createUser, updateUser, saveProfile }
})
