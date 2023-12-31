<template>
  <div>
    <YoutubePlayer
      v-if="songStore.currentSong"
      :key="songStore.currentSong.videoId"
      :playing="playing"
      @end="nextVideo"
      :videoId="songStore.currentSong.videoId"
    />
    <div v-else>
      <p>Aún no hay canciones</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import YoutubePlayer from '@/components/molecules/YoutubePlayer.vue'
import { useSongStore } from '@/stores/song'
import { useWebSocket } from '@vueuse/core'
import { onMounted, ref } from 'vue'

useWebSocket(`${import.meta.env.VITE_API_URL.replace('http', 'ws')}/ws`, {
  autoReconnect: true,
  heartbeat: true,
  onMessage: (_ws, event) => {
    if (event.data === 'next') {
      nextVideo()
    }
    if (event.data === 'previous') {
      previousVideo()
    }
    if (event.data === 'pause') {
      playing.value = false
    }
    if (event.data === 'play') {
      playing.value = true
    }
  }
})
const songStore = useSongStore()
const playing = ref(true)
const { data: songs, onFetchResponse } = songStore.fetchSongs()
const index = ref<number>(0)

const nextVideo = () => {
  songStore.updateSongStatus(songStore.currentSong?._id!, 'played')
  index.value++
  if (songs.value?.[index.value]) {
    songStore.setCurrentSong(songs.value?.[index.value])
  }
  songStore.updateSongStatus(songStore.currentSong?._id!, 'playing')
}

const previousVideo = () => {
  songStore.updateSongStatus(songStore.currentSong?._id!, 'played')
  console.log(index.value)
  index.value--
  if (songs.value?.[index.value]) {
    songStore.setCurrentSong(songs.value?.[index.value])
  }
  songStore.updateSongStatus(songStore.currentSong?._id!, 'playing')
}

onMounted(() => {
  onFetchResponse(() => {
    songStore.setCurrentSong(songs.value![0])
    songStore.updateSongStatus(songStore.currentSong?._id!, 'playing')
  })
})
</script>
