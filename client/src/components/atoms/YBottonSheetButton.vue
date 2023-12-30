<template>
  <RouterLink
    @click="$emit('click')"
    :to="to"
    class="flex flex-col items-center rounded-full h16 w-16 pt-2"
    :class="activeClasses"
  >
    <div class="text-3xl h-8 w-12 flex justify-center">
      <slot name="icon" />
    </div>
    <span class="text-sm">
      <slot />
    </span>
  </RouterLink>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  to: string
  active: boolean
}>()

defineSlots<{
  default: {}
  icon: {}
}>()

defineEmits(['click'])

const activeClasses = computed(() => {
  return {
    'text-white': props.active,
    'bg-purple-9': props.active
  }
})
</script>
