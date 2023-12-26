<template>
  <div class="flex justify-center">
    <button @click="emit('previous')">
      <div class="i-mdi-skip-previous text-[120px]"></div>
    </button>
    <button @click="handlePlayPause">
      <div
        :class="[
          'text-orange-500',
          playing ? 'i-mdi-pause' : 'i-mdi-play',
          'text-[120px]'
        ]"
      ></div>
    </button>
    <button @click="emit('next')">
      <div class="i-mdi-skip-next text-[120px]"></div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const playing = ref(true)
const emit = defineEmits(['play', 'pause', 'next', 'previous'])

const handlePlayPause = () => {
  playing.value = !playing.value
  playing.value ? emit('play') : emit('pause')
}
</script>
