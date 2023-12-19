<template>
  <div class="flex flex-col">
    <label class="text-purple-300" for="name">Nombre:</label>
    <input
      v-model="value"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      class="text-purple-700 h-16 text-lg p-4 uppercase border-2 ring-2 ring-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

withDefaults(
  defineProps<{
    label: string
    name?: string
    placeholder?: string
    type?: string
  }>(),
  {
    type: 'text'
  }
)
const value = ref('')
const emit = defineEmits(['update:modelValue'])
watch(value, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>
