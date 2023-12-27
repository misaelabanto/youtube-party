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
        <YVideoPreview :video="video" @add="addSong" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import YButton from '@/components/atoms/YButton.vue'
import YInput from '@/components/atoms/YInput.vue'
import YVideoPreview from '@/components/atoms/YVideoPreview.vue'
import SongConfirmation from '@/components/molecules/SongConfirmation.vue'
import type { Video } from '@/interfaces/video'
import { useFetch } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const songSearchText = ref('')
const videos = ref<Video[]>([])
const url = computed(() => {
  return `${import.meta.env.VITE_API_URL}/search?q=${songSearchText.value}`
})
const viewConfirmation = ref(true)

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
  songSearchText.value = ''
  videos.value = []
}

const addSong = () => {}

watch(data, () => {
  if (!data.value) return
  videos.value = data.value
})
</script>
