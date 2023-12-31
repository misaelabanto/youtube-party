<template>
  <div class="flex flex-col sm:flex-row bg-gray-8 p-2 justify-between">
    <div class="flex flex-col sm:flex-row">
      <img
        class="object-cover w-[200px] rounded-lg"
        :src="song.thumbnail"
        :alt="song.title"
      />
      <div class="ml-3 mt-3">
        <p class="text-xl font-medium" v-html="song.title"></p>
        <div class="flex text-sm text-gray-500">
          <span :class="playingClass">{{ SONG_STATES[song.status] }}</span>
          <span class="mx-1">•</span>
          <span>{{ authorLabel }}</span>
          <span class="mx-1">•</span>
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
        @click="$emit('vote', 'up')"
        :class="[
          song.userUpVoted ? 'text-green-500' : 'text-green-200',
          'hover:text-green-500'
        ]"
      >
        <span class="">{{ song.upVotes }}</span>
        <div class="i-mdi:arrow-up-thick text-5xl"></div>
      </button>
      <button
        @click="$emit('vote', 'down')"
        :class="[
          song.userDownVoted ? 'text-red-500' : 'text-red-200',
          'hover:text-red-500'
        ]"
      >
        <span class="">{{ song.downVotes }}</span>
        <div class="i-mdi:arrow-down-thick text-5xl"></div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Song } from '@/interfaces/song'
import type { User } from '@/interfaces/user'
import { computed } from 'vue'

const SONG_STATES: Record<'pending' | 'playing' | 'played', string> = {
  pending: 'En cola',
  playing: 'Sonando ahora',
  played: 'Yala'
}

const props = defineProps<{
  song: Song
}>()

const playingClass = props.song.status === 'playing' ? 'text-green-500' : ''

const authorLabel = computed(() => {
  const user = props.song.addedBy as User
  return `${user.name} ${user.emoji}`
})

defineEmits<{
  (e: 'vote', vote: 'up' | 'down'): void
}>()
</script>
