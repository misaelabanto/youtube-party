<template>
  <div class="flex flex-col sm:flex-row bg-gray-8 p-2 justify-between">
    <div class="flex flex-col sm:flex-row">
      <img
        class="object-cover w-full w-[40px] rounded-lg"
        :src="song.thumbnail"
        :alt="song.title"
      />
      <div class="ml-3 mt-3">
        <p class="text-xl font-medium" v-html="song.title"></p>
        <div class="flex text-sm text-gray-500">
          <time :datetime="new Date(song.createdAt).toISOString()">
            {{
              new Date(song.createdAt).toLocaleTimeString('en-US', {
                timeStyle: 'medium'
              })
            }}
          </time>
        </div>
      </div>
    </div>
    <div class="flex justify-end">
      <button
        :class="[
          upVoted ? 'text-green-500' : 'text-green-200',
          'hover:text-green-500'
        ]"
      >
        <span class="">4</span>
        <div class="i-mdi:arrow-up-thick text-5xl"></div>
      </button>
      <button
        :class="[
          downVoted ? 'text-red-500' : 'text-red-200',
          'hover:text-red-500'
        ]"
      >
        <span class="">8</span>
        <div class="i-mdi:arrow-down-thick text-5xl"></div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Song } from '@/interfaces/song'

defineProps<{
  song: Song
  upVoted: boolean
  downVoted: boolean
}>()
</script>
