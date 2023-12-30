<template>
  <div>
    <h1 class="text-2xl font-medium" @click="() => fetchSongs()">
      Cola de canciones
    </h1>
    <TransitionGroup name="list" tag="div">
      <div
        v-for="(song, index) in songs"
        :key="index + song.videoId"
        class="my-3"
      >
        <YSongItem
          :song="song"
          @vote="(voteType: 'up' | 'down') => addVote(song._id, voteType)"
        />
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import YSongItem from '@/components/atoms/YSongItem.vue'
import { useProfileStore } from '@/stores/profile'
import { useSongStore } from '@/stores/song'
import { useVoteStore } from '@/stores/vote'

const { fetchSongs } = useSongStore()
const { data: songs, execute } = fetchSongs()
const { createVote } = useVoteStore()
const { profile } = useProfileStore()

const addVote = async (songId: string, type: 'up' | 'down') => {
  await createVote({
    song: songId,
    voteType: type,
    user: profile._id
  })
  await execute()
}
</script>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(400px);
}
</style>
