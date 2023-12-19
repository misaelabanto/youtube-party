<template>
  <button
    class="h-10 bg-purple-500 text-lg font-bold text-white hover:bg-purple-600 focus:ring-blue-200"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  loading?: boolean
}>()
</script>
