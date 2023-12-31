<template>
  <div class="flex flex-col" v-if="profile">
    <YInput
      v-model="profile.name"
      label="Nombre"
      placeholder="¿Cómo te llamas?"
    />
    <YEmojiPicker v-model="profile.emoji" />
    <YButton
      @click="$emit('save', { name: profile.name, emoji: profile.emoji })"
      class="mt-4"
    >
      {{ saveButtonName }}
    </YButton>
  </div>
</template>

<script setup lang="ts">
import YButton from '@/components/atoms/YButton.vue'
import YEmojiPicker from '@/components/atoms/YEmojiPicker.vue'
import YInput from '@/components/atoms/YInput.vue'
import type { User } from '@/interfaces/user'
import { onMounted, reactive } from 'vue'

const props = defineProps<{
  modelValue?: User
  saveButtonName?: string
}>()

const profile = reactive<Partial<User>>({})

onMounted(() => {
  Object.assign(
    profile,
    props.modelValue?.name
      ? props.modelValue
      : {
          name: 'John Locke',
          emoji: '🔒'
        }
  )
})

defineEmits(['save'])
</script>
