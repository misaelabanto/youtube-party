<template>
  <RouterLink
    @click="$emit('click')"
    :to="to"
    :class="{
      flex: true,
      'flex-col': true,
      'items-center': true,
      'rounded-full': true,
      h16: true,
      'w-16': true,
      'pt-2': true,
      ...activeClasses
    }"
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
    'dark:bg-orange-9': props.active,
    'bg-orange-400': props.active,
    'light:text-white': props.active
  }
})
</script>
