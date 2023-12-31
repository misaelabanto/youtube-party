<template>
  <div class="flex flex-col">
    <label class="text-purple-300" for="name">{{ label }}</label>
    <input
      v-model="value"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      class="text-purple-700 h-16 text-lg p-4 border-2 ring-2 ring-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    label: string
    name?: string
    placeholder?: string
    type?: string
    modelValue?: string
  }>(),
  {
    type: 'text',
    modelValue: ''
  }
)
const value = ref('')
const emit = defineEmits(['update:modelValue'])
watch(value, (newValue) => {
  emit('update:modelValue', newValue)
})
watch(
  () => props.modelValue,
  (newValue) => {
    value.value = newValue
  }
)
</script>
