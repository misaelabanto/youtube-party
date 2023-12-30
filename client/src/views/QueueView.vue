<template>
  <div>
    <h1 class="text-2xl font-medium" @click="() => fetchSongs()">
      Cola de canciones
    </h1>
    <div v-for="song in songs" :key="song._id">
      <YSongItem :down-voted="false" :up-voted="true" :song="song" />
    </div>
  </div>
</template>

<script setup lang="ts">
import YSongItem from '@/components/atoms/YSongItem.vue'
import { useSongStore } from '@/stores/song'

const { fetchSongs } = useSongStore()
const { data: songs } = fetchSongs()
</script>
