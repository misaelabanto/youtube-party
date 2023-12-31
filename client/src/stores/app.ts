import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const tabActive = ref<'search' | 'profile' | 'queue'>('search')
  return {
    tabActive
  }
})
