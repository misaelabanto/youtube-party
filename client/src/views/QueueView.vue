<template>
  <div>
    <h1 class="text-2xl font-medium" @click="() => fetchSongs()">
      Cola de canciones
    </h1>
    <TransitionGroup name="list" tag="div">
      <div
        v-for="(song, index) in songs"
        :key="index + song.videoId"
        class="my-3"
      >
        <YSongItem
          :song="song"
          @vote="(voteType: 'up' | 'down') => addVote(song._id, voteType)"
        />
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import YSongItem from '@/components/atoms/YSongItem.vue'
import { useAlertStore } from '@/stores/alert'
import { useProfileStore } from '@/stores/profile'
import { useSongStore } from '@/stores/song'
import { useVoteStore } from '@/stores/vote'
import { useWebSocket } from '@vueuse/core'

const { fetchSongs } = useSongStore()
const { show } = useAlertStore()
const { data: songs, execute } = fetchSongs()
const { createVote } = useVoteStore()
const { profile } = useProfileStore()

useWebSocket(`${import.meta.env.VITE_API_URL.replace('http', 'ws')}/ws`, {
  autoReconnect: true,
  heartbeat: true,
  onMessage: (_ws, event) => {
    if (event.data === 'vote') {
      execute()
      show('info', 'Alguien votó por una canción 👍/👎')
    }
    if (event.data === 'song') {
      execute()
      show('success', 'Alguien agregó una canción ✅')
    }
    if (event.data === 'previous') {
      execute()
      show('info', 'Pasó a la canción anterior ⏪️')
    }
    if (event.data === 'next') {
      execute()
      show('info', 'Pasó a la siguiente canción ⏩️')
    }
    if (event.data === 'play') {
      execute()
      show('success', 'Reproduciendo la canción 🎵')
    }
    if (event.data === 'pause') {
      execute()
      show('error', 'Se pausó la canción ⏸️')
    }
  }
})

const addVote = async (songId: string, type: 'up' | 'down') => {
  await createVote({
    song: songId,
    voteType: type,
    user: profile._id
  })
  await execute()
}
</script>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(400px);
}
</style>
