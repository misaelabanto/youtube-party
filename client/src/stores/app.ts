import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const tabActive = ref<'search' | 'profile' | 'queue'>()
  const setTabActive = (tab: 'search' | 'profile' | 'queue') => {
    tabActive.value = tab
  }
  return {
    tabActive,
    setTabActive
  }
})
