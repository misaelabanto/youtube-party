import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import 'vue3-emoji-picker/css'
import './assets/main.css'

import { createManager } from '@vue-youtube/core'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(createManager())

app.mount('#app')
