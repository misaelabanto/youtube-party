<template>
  <div class="flex flex-col">
    <YInput v-model="name" label="Nombre" placeholder="John Locke" />
    <YEmojiPicker />
    <YButton @click="" class="mt-4">Ingresar</YButton>
  </div>
</template>

<script setup lang="ts">
import YButton from '@/components/atoms/YButton.vue'
import YEmojiPicker from '@/components/atoms/YEmojiPicker.vue'
import YInput from '@/components/atoms/YInput.vue'

import { ref, watch } from 'vue'

const name = ref('')

watch(name, (newName) => {
  console.log(newName)
})
</script>
