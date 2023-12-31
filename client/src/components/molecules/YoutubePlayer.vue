<template>
  <div class="md:h-screen">
    <div ref="youtube"></div>
  </div>
</template>

<script setup lang="ts">
import { usePlayer } from '@vue-youtube/core'
import { ref, watch } from 'vue'

const emit = defineEmits(['start', 'end'])
const props = withDefaults(
  defineProps<{
    playing: boolean
    videoId: string
  }>(),
  {
    playing: true
  }
)

watch(
  () => props.playing,
  (playing) => {
    if (playing) {
      instance.value?.playVideo()
    } else {
      instance.value?.pauseVideo()
    }
  }
)

const youtube = ref()

const { onReady, onStateChange, instance } = usePlayer(props.videoId, youtube, {
  cookie: false,
  playerVars: {
    mute: 0,
    controls: 0,
    origin: 'https://www.youtube-nocookie.com'
  },
  height: '100%',
  width: '100%'
})

onStateChange((event) => {
  console.log(event)
  if (event.data === 0) {
    emit('end')
  }
})

onReady((event) => {
  event.target.playVideo()
})
</script>
