<template>
  <div class="fixed inset-x-0 bottom-0 bg-gray-800 shadow shadow-xl">
    <div class="flex justify-between max-w-md mx-auto py-4 px-8">
      <YBottonSheetButton
        :active="active === 'queue'"
        @click="$emit('update:active', 'queue')"
        to="/queue"
      >
        <template #icon>
          <div class="i-mdi:playlist-music"></div>
        </template>
        Cola
      </YBottonSheetButton>
      <YBottonSheetButton
        :active="active === 'search'"
        @click="$emit('update:active', 'search')"
        to="/"
      >
        <template #icon>
          <div class="i-mdi:magnify"></div>
        </template>
        Buscar
      </YBottonSheetButton>
      <YBottonSheetButton
        :active="active === 'profile'"
        @click="$emit('update:active', 'profile')"
        to="/profile"
      >
        <template #icon>
          <div class="i-mdi:account"></div>
        </template>
        Perfil
      </YBottonSheetButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import YBottonSheetButton from '@/components/atoms/YBottonSheetButton.vue'

defineProps<{
  active: string
}>()
defineEmits<{
  (e: 'update:active', value: 'queue' | 'search' | 'profile'): void
}>()
</script>
