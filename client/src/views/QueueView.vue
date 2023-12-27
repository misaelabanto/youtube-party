<template>
  <div>
    <h1 class="text-2xl font-medium">Cola de canciones</h1>
    <div v-for="song in songs" :key="song.id">
      <YSongItem :song="song" />
    </div>
  </div>
</template>

<script setup lang="ts">
import YSongItem from '@/components/atoms/YSongItem.vue'
import { useSongStore } from '@/stores/song'
import { onMounted } from 'vue'

const { songs, fetchSongs } = useSongStore()

onMounted(() => fetchSongs())
</script>
