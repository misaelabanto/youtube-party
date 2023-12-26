import { useFetch } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export type Song = {
  id: string
  title: string
  addedAt: number
  upVotes: number
  downVotes: number
  addedBy: number
}

export const useSongStore = defineStore('song', () => {
  const currentSong = ref<Song>({
    id: '',
    title: '',
    addedAt: 0,
    upVotes: 0,
    downVotes: 0,
    addedBy: 0
  })
  const songs = ref<Song[]>([])

  function fetchSongs() {
    const { data } = useFetch<Song[]>(
      `${import.meta.env.VITE_API_URL}/songs`
    ).get()
    if (data.value) {
      songs.value = data.value
    }
  }

  function setCurrentSong(song: Song) {
    currentSong.value = song
  }

  return { currentSong, fetchSongs, songs, setCurrentSong }
})
