import type { Song } from '@/interfaces/song'
import { useProfileStore } from '@/stores/profile'
import { useFetch } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const { profile } = useProfileStore()

export const useSongStore = defineStore('song', () => {
  const currentSong = ref<Song>()
  const fetchSongs = () =>
    useFetch<Song[]>(
      `${import.meta.env.VITE_API_URL}/songs?userId=${profile?._id}`,
      {
        initialData: []
      }
    ).json<Song[]>()

  const addSong = (song: Pick<Song, 'addedBy' | 'title' | 'thumbnail'>) =>
    useFetch<Song>(`${import.meta.env.VITE_API_URL}/songs`)
      .post(song)
      .json<Song>()

  function setCurrentSong(song: Song) {
    currentSong.value = song
  }

  return {
    currentSong,
    fetchSongs,
    addSong,
    setCurrentSong
  }
})
