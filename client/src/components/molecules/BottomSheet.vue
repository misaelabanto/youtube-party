<template>
  <div class="fixed inset-x-0 bottom-0 bg-gray-800 shadow shadow-xl">
    <div class="flex justify-between max-w-md mx-auto py-4 px-8">
      <YBottonSheetButton
        @click="setTabActive('queue')"
        :active="tabActive === 'queue'"
        to="/queue"
      >
        <template #icon>
          <div class="i-mdi:playlist-music"></div>
        </template>
        Cola
      </YBottonSheetButton>
      <YBottonSheetButton
        @click="setTabActive('search')"
        :active="tabActive === 'search'"
        to="/"
      >
        <template #icon>
          <div class="i-mdi:magnify"></div>
        </template>
        Buscar
      </YBottonSheetButton>
      <YBottonSheetButton
        @click="setTabActive('profile')"
        :active="tabActive === 'profile'"
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
import { useAppStore } from '@/stores/app'
const { tabActive, setTabActive } = useAppStore()
</script>
