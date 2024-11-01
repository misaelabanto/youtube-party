<template>
  <div
    class="fixed inset-0 bg-white dark:bg-gray-900 bg-opacity-50 flex justify-center items-center mx-4 z-20"
  >
    <div class="dark:bg-gray-8 p-6 rounded-lg shadow-xl bg-white">
      <div class="i-mdi-check-circle text-green-500 text-[120px] mx-auto"></div>
      <p class="text-xl">Acabo de agregar tu canción a la cola 😉</p>
      <p>¿Qué quieres hacer ahora?</p>
      <div class="flex flex-col gap-1 my-2">
        <YButton class="mx-2" @click="emit('goToQueue')">Ver cola</YButton>
        <YButton class="mx-2" @click="emit('goToSearch')">
          Buscar otra canción
        </YButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import YButton from '@/components/atoms/YButton.vue'

const emit = defineEmits(['goToQueue', 'goToSearch'])
</script>
