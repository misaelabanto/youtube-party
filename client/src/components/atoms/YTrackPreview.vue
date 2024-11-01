<template>
  <div class="flex flex-col sm:flex-row dark:bg-gray-8 p-2 justify-between">
    <div class="flex flex-col sm:flex-row">
      <audio ref="audioRef" class="rounded-lg">
        <source :src="track.preview_url" type="audio/mp3" />
      </audio>
      <div class="relative w-full sm:w-[120px] sm:h-[120px]">
        <img
          class="h-full w-full inset-0 object-cover rounded-lg"
          :src="track.album.images[1].url"
          :alt="track.name"
        />
        <div
          v-if="track.preview_url"
          class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg"
          @click="$emit('toggle-play')"
        >
          <span v-if="playing" class="text-white text-4xl">
            <Icon icon="mdi:pause" />
          </span>
          <span v-else class="text-white text-4xl">
            <Icon icon="mdi:play" />
          </span>
        </div>
      </div>
      <div class="ml-3">
        <p class="text-xl font-bold">{{ track.name }}</p>
        <small class="text-lg">{{ track.artists[0].name }}</small>
        <div class="flex text-sm text-gray-500">
          <time :datetime="track.album.release_date">
            {{ new Date(track.album.release_date).getFullYear() }}
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
            videoId: track.uri,
            title: track.name,
            thumbnail: track.album.images[1].url
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
import type { Track } from '@/interfaces/track'
import { Icon } from '@iconify/vue'
import { ref, watch } from 'vue'

const props = defineProps<{
  track: Track
  loading: boolean
  playing: boolean
}>()

const audioRef = ref<HTMLAudioElement>()

watch(
  () => props.playing,
  () => {
    if (!audioRef.value) return
    if (audioRef.value.paused) {
      audioRef.value.play()
    } else {
      audioRef.value.pause()
    }
  }
)

defineEmits<{
  (e: 'add', song: Pick<Song, 'title' | 'thumbnail' | 'videoId'>): void
  (e: 'toggle-play'): void
}>()
</script>
