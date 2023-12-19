import { useFetch } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export type User = {
  id: number
  name: string
  emoji: string
}

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<User>()
  const createUser = async (name: string, emoji: string) => {
    const { data, isFetching, onFetchResponse } = useFetch(
      'http://localhost:3000/users'
    ).post({ name, emoji })

    onFetchResponse((response) => {
      if (response.ok) {
        localStorage.setItem('profile:name', name)
        localStorage.setItem('profile:id', (data.value as any).id)
      }
    })

    function onFinished() {}

    return { data, isFetching, onFinished }
  }

  return { profile, createUser, updateUser }
})
