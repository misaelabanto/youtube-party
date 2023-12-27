<template>
  <div class="flex flex-col sm:flex-row bg-gray-8 p-2 justify-between">
    <div class="flex flex-col sm:flex-row">
      <img
        class="object-cover w-full sm:w-[120px] rounded-lg"
        :src="song.thumbnail"
        :alt="song.title"
      />
      <div class="ml-3 mt-3">
        <p class="text-lg font-medium" v-html="song.title"></p>
        <div class="flex text-sm text-gray-500">
          <time :datetime="new Date(song.addedAt).toISOString()">
            {{
              new Date(song.addedAt).toLocaleTimeString('en-US', {
                timeStyle: 'medium'
              })
            }}
          </time>
        </div>
      </div>
    </div>
    <div class="flex justify-end">
      <button>
        <div class="i-mdi:arrow-up-thick text-5xl text-green-500"></div>
      </button>
      <button>
        <div class="i-mdi:arrow-down-thick text-5xl text-red-500"></div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Song } from '@/stores/song'

defineProps<{
  song: Song
}>()
</script>
