// uno.config.ts
import { defineConfig, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno({
      dark: 'media'
    }),
    presetIcons({
      autoInstall: true
    })
  ]
})
