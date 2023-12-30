<template>
  <div class="flex flex-col sm:flex-row bg-gray-8 p-2 justify-between">
    <div class="flex flex-col sm:flex-row">
      <img
        class="object-cover w-full sm:w-[120px] rounded-lg"
        :src="video.snippet.thumbnails.medium.url"
        :alt="video.snippet.title"
      />
      <div class="ml-3">
        <p class="text-lg font-medium" v-html="video.snippet.title"></p>
        <div class="flex text-sm text-gray-500">
          <time :datetime="video.snippet.publishTime">
            {{ new Date(video.snippet.publishTime).getFullYear() }}
          </time>
        </div>
      </div>
    </div>
    <div>
      <YButton
        :loading="loading"
        class="w-40"
        @click="
          $emit('add', {
            videoId: video.id.videoId!,
            title: video.snippet.title,
            thumbnail: video.snippet.thumbnails.medium.url
          })
        "
        >Agregar</YButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import YButton from '@/components/atoms/YButton.vue'
import type { Song } from '@/interfaces/song'
import type { Video } from '@/interfaces/video'

defineProps<{
  video: Video
  loading: boolean
}>()

defineEmits<{
  (e: 'add', song: Pick<Song, 'title' | 'thumbnail' | 'videoId'>): void
}>()
</script>
