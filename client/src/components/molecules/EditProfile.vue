<template>
  <form
    class="flex flex-col"
    v-if="profile"
    @submit.prevent="
      $emit('save', { name: profile.name, emoji: profile.emoji })
    "
  >
    <YInput
      v-model="profile.name"
      label="Nombre"
      placeholder="¿Cómo te llamas?"
    />
    <YEmojiPicker v-model="profile.emoji" />
    <YButton
      @click="$emit('save', { name: profile.name, emoji: profile.emoji })"
      class="mt-4"
      :loading="loading"
    >
      {{ saveButtonName }}
    </YButton>
  </form>
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
  loading: boolean
}>()

const profile = reactive<Partial<User>>({})

onMounted(() => {
  if (props.modelValue) {
    profile.name = props.modelValue.name
    profile.emoji = props.modelValue.emoji
  }
})

defineEmits(['save'])
</script>
