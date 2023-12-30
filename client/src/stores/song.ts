import type { Song } from '@/interfaces/song'
import { useFetch } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useSongStore = defineStore('song', () => {
  const currentSong = ref<Song>({
    id: '',
    title: '',
    createdAt: 0,
    addedBy: 0,
    thumbnail: ''
  })
  const {
    data,
    isFetching,
    get: fetchSongs
  } = useFetch<Song[]>(`${import.meta.env.VITE_API_URL}/songs`, {
    initialData: []
  }).json<Song[]>()

  const { post: addSong } = useFetch<Song>(
    `${import.meta.env.VITE_API_URL}/songs`,
    {
      immediate: false
    }
  ).json<Song>()

  function setCurrentSong(song: Song) {
    currentSong.value = song
  }

  return {
    currentSong,
    fetchSongs,
    songs: computed(() => data),
    addSong,
    setCurrentSong,
    isFetching
  }
})
