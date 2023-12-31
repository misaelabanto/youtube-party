<template>
  <div
    v-if="alert.visible"
    class="fixed top-0 left-0 right-0 z-50 p-4 text-white text-sm rounded-b-lg shadow-lg flex items-center justify-between"
    :class="ALERT_COLOR_CLASSES[alert.type]"
    role="alert"
  >
    <div class="alert-content">
      {{ alert.message }}
    </div>
    <button class="alert-close ml-auto" @click="alertStore.close()">
      <span class="sr-only">Close</span>
      <svg
        class="w-4 h-4 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          d="M14.348 14.849a1.2 1.2 0 100-1.701L10.875 10l3.473-3.148a1.2 1.2 0 10-1.697-1.701L9.168 8.293 5.697 5.145a1.2 1.2 0 10-1.697 1.701L7.473 10l-3.473 3.148a1.2 1.2 0 101.697 1.701l3.471-3.148 3.478 3.148z"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useAlertStore } from '@/stores/alert'
import { storeToRefs } from 'pinia'

const alertStore = useAlertStore()

const { alert } = storeToRefs(alertStore)

const ALERT_COLOR_CLASSES = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  warning: 'bg-yellow-500',
  info: 'bg-blue-500'
}
</script>
