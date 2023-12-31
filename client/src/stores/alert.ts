import { defineStore } from 'pinia'
import { reactive } from 'vue'

export type AlertType = 'success' | 'error' | 'warning' | 'info'

export const useAlertStore = defineStore('alert', () => {
  const alert = reactive({
    message: '',
    visible: false,
    type: 'success' as AlertType
  })
  const show = (alertType: AlertType, msg: string) => {
    alert.type = alertType
    alert.message = msg
    alert.visible = true
    setTimeout(() => {
      alert.visible = false
    }, 3000)
  }
  const close = () => {
    alert.visible = false
  }
  return { alert, show, close }
})
