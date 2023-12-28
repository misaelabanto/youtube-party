import type { Song } from '@/interfaces/song'
import { useFetch } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useSongStore = defineStore('song', () => {
  const currentSong = ref<Song>({
    id: '',
    title: '',
    addedAt: 0,
    upVotes: 0,
    downVotes: 0,
    addedBy: 0,
    thumbnail: ''
  })
  const { data, isFetching, execute } = useFetch<Song[]>(
    `${import.meta.env.VITE_API_URL}/songs`,
    {
      initialData: [],
      immediate: false
    }
  )
    .get()
    .json<Song[]>()

  const { post: addSong } = useFetch<Song>(
    `${import.meta.env.VITE_API_URL}/songs`
  ).json<Song>()

  function setCurrentSong(song: Song) {
    currentSong.value = song
  }

  return {
    currentSong,
    fetchSongs: execute,
    songs: computed(() => data),
    addSong: addSong,
    setCurrentSong,
    isFetching
  }
})
