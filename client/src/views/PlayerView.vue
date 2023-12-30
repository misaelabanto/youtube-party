<template>
  <div>
    <YoutubePlayer
      :playing="playing"
      @end="nextVideo"
      :videoId="currentSong.id"
    />
    <PlayerActions
      @pause="playing = false"
      @play="playing = true"
      @next="nextVideo"
      @previous="previousVideo"
    />
  </div>
</template>

<script setup lang="ts">
import PlayerActions from '@/components/molecules/PlayerActions.vue'
import YoutubePlayer from '@/components/molecules/YoutubePlayer.vue'
import { useSongStore } from '@/stores/song'
import { ref } from 'vue'

const { currentSong, songs, setCurrentSong, fetchSongs } = useSongStore()
const playing = ref(true)

const nextVideo = () => {
  const index = songs.findIndex((song) => song.id === currentSong?._id)
  if (index === songs.length - 1) {
    return
  }
  setCurrentSong(songs[index + 1])
}
fetchSongs()

const previousVideo = () => {
  const index = songs.findIndex((song) => song.id === currentSong?._id)
  if (index === 0) {
    return
  }
  setCurrentSong(songs[index - 1])
}
</script>
