<template>
  <button
    @click="$emit('click')"
    :disabled="loading || disabled"
    class="h-16 bg-orange-500 text-lg font-bold text-white disabled:bg-orange-500 hover:bg-orange-600 focus:ring-blue-200 rounded-lg"
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
    disabled?: boolean
  }>(),
  {
    type: 'button'
  }
)
defineEmits(['click'])
</script>
