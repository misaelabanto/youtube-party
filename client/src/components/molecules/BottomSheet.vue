<template>
  <div
    class="fixed inset-x-0 bottom-0 bg-white dark:bg-gray-800 shadow shadow-black shadow-2xl"
  >
    <div class="flex justify-between max-w-md mx-auto py-4 px-8">
      <YBottonSheetButton
        :active="active === 'queue'"
        @click="$emit('update:active', 'queue')"
        to="/queue"
      >
        <template #icon>
          <span class="text-gray-400 i-mdi:playlist-music"></span>
        </template>
        Cola
      </YBottonSheetButton>
      <YBottonSheetButton
        :active="active === 'search'"
        @click="$emit('update:active', 'search')"
        to="/"
      >
        <template #icon>
          <span class="text-gray-400 i-mdi:magnify"></span>
        </template>
        Buscar
      </YBottonSheetButton>
      <YBottonSheetButton
        :active="active === 'profile'"
        @click="$emit('update:active', 'profile')"
        to="/profile"
      >
        <template #icon>
          <span class="text-gray-400 i-mdi:account"></span>
        </template>
        Perfil
      </YBottonSheetButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import YBottonSheetButton from '@/components/atoms/YBottomSheetButton.vue'

defineProps<{
  active: string
}>()
defineEmits<{
  (e: 'update:active', value: 'queue' | 'search' | 'profile'): void
}>()
</script>
