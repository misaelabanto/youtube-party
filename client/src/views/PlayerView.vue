<template>
  <div>
    <div>
      <YButton class="px-8" @click="onToggle">Play!</YButton>
      <p>Aún no hay canciones</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
// import YoutubePlayer from '@/components/molecules/YoutubePlayer.vue'
import YButton from '@/components/atoms/YButton.vue'
import { useSongStore } from '@/stores/song'
import { useWebSocket } from '@vueuse/core'
import { onMounted, ref } from 'vue'

const loadSpotifyScript = () => {
  const script = document.createElement('script')
  script.src = 'https://sdk.scdn.co/spotify-player.js'
  script.async = true
  document.body.appendChild(script)
}

let player: any

window.onSpotifyWebPlaybackSDKReady = () => {
  player = new Spotify.Player({
    name: 'Halloween Party',
    getOAuthToken: async (cb) => {
      const response = await fetch(
        import.meta.env.VITE_API_URL + '/auth/token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      const data = await response.json()
      cb(data.accessToken)
    },
    volume: 0.5
  })

  // Ready
  player.addListener('ready', ({ device_id }: any) => {
    console.log('Ready with Device ID', device_id)
  })

  // Not Ready
  player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id)
  })

  player.addListener('initialization_error', ({ message }) => {
    console.error(message)
  })

  player.addListener('authentication_error', ({ message }) => {
    console.error(message)
  })

  player.addListener('account_error', ({ message }) => {
    console.error(message)
  })

  player.connect()
}

loadSpotifyScript()

const onToggle = () => {
  console.log('toggle')
  player.togglePlay()
}

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
