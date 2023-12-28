<template>
  <div class="flex flex-col">
    <YInput
      :model-value="modelValue?.name"
      @update:model-value="(name) => (profile.name = name)"
      label="Nombre"
      placeholder="John Locke"
    />
    <YEmojiPicker
      :model-value="modelValue?.emoji"
      @update:model-value="(emoji) => (profile.emoji = emoji)"
    />
    <YButton @click="$emit('save', profile)" class="mt-4">
      {{ saveButtonName }}
    </YButton>
  </div>
</template>

<script setup lang="ts">
import YButton from '@/components/atoms/YButton.vue'
import YEmojiPicker from '@/components/atoms/YEmojiPicker.vue'
import YInput from '@/components/atoms/YInput.vue'
import type { User } from '@/interfaces/user'
import { onMounted, ref } from 'vue'

const props = defineProps<{
  modelValue?: User
  saveButtonName?: string
}>()

const profile = ref<Partial<User>>({})

onMounted(() => {
  profile.value = props.modelValue
    ? props.modelValue
    : {
        name: 'John Locke',
        emoji: '🔒'
      }
})

defineEmits(['save'])
</script>
