<template>
  <button
    @click="$emit('click')"
    :disabled="loading"
    class="h-16 bg-purple-500 text-lg font-bold text-white hover:bg-purple-600 focus:ring-blue-200 rounded-lg"
  >
    <template v-if="loading">
      <YSpinner />
    </template>
    <template v-else>
      <slot />
    </template>
  </button>
</template>

<script lang="ts" setup>
import YSpinner from '@/components/atoms/YSpinner.vue'
withDefaults(
  defineProps<{
    loading?: boolean
    type?: string
  }>(),
  {
    type: 'button'
  }
)
defineEmits(['click'])
</script>
