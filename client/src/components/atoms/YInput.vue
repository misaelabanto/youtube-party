<template>
  <div class="flex flex-col">
    <label for="name">Nombre:</label>
    <input
      name="name"
      type="text"
      placeholder="John Locke"
      class="text-purple-700 h-16 text-lg p-4 uppercase"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>
