<template>
  <PlayerActions
    @pause="send('pause')"
    @play="send('play')"
    @next="send('next')"
    @previous="send('previous')"
  />
</template>

<script setup lang="ts">
import PlayerActions from '@/components/molecules/PlayerActions.vue'
import { useWebSocket } from '@vueuse/core'

const { send } = useWebSocket(
  `${import.meta.env.VITE_API_URL.replace('http', 'ws')}/ws`
)
</script>
