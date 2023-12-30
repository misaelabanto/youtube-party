<template>
  <div>
    <SongConfirmation
      v-if="viewConfirmation"
      @go-to-queue="goToQueue"
      @go-to-search="goToSearch"
    />
    <form class="flex flex-col" @submit.prevent="search">
      <YInput label="Buscar canción" v-model="songSearchText" />
      <YButton @click="search" type="submit" :loading="isFetching">
        Buscar
      </YButton>
    </form>
    <div class="my-5 shadow shadow-lg">
      <div v-for="video in videos" :key="video?.id?.videoId">
        <YVideoPreview
          :loading="isAdding"
          :video="video"
          @add="addSongToQueue"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import YButton from '@/components/atoms/YButton.vue'
import YInput from '@/components/atoms/YInput.vue'
import YVideoPreview from '@/components/atoms/YVideoPreview.vue'
import SongConfirmation from '@/components/molecules/SongConfirmation.vue'
import type { Song } from '@/interfaces/song'
import type { Video } from '@/interfaces/video'
import { useProfileStore } from '@/stores/profile'
import { useSongStore } from '@/stores/song'
import { useFetch } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { addSong } = useSongStore()
const { profile } = useProfileStore()
const songSearchText = ref('')
const isAdding = ref(false)
const videos = ref<Video[]>([])
const url = computed(() => {
  return `${import.meta.env.VITE_API_URL}/search?q=${songSearchText.value}`
})
const viewConfirmation = ref(false)

const { data, execute, isFetching } = useFetch<Video[]>(url, {
  immediate: false,
  initialData: []
})
  .get()
  .json()

const search = () => {
  execute()
}

const goToQueue = () => {
  router.push({ name: 'queue' })
}

const goToSearch = () => {
  viewConfirmation.value = false
  videos.value = []
  songSearchText.value = ''
}

const addSongToQueue = async (song: Pick<Song, 'title' | 'thumbnail'>) => {
  isAdding.value = true
  await addSong({
    ...song,
    addedBy: profile._id
  })
  viewConfirmation.value = true
  isAdding.value = false
}

watch(data, () => {
  if (!data.value) return
  videos.value = data.value
})
</script>
