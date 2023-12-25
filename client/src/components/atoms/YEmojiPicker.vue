<template>
  <div class="flex flex-col">
    <label for="">Emoji:</label>
    <div
      class="text-white text-[80px] w-[100px] h-[100px] text-center mx-auto"
      @click="onEmojiClick"
    >
      <span class="border border-1 rounded-lg hover:border-purple-500">
        {{ currentEmoji }}
      </span>
    </div>
    <EmojiPicker
      v-if="show"
      disable-skin-tones
      @select="(emoji) => onEmojiSelect(emoji.i)"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import EmojiPicker from 'vue3-emoji-picker'
const currentEmoji = ref('')
const show = ref(false)
const getRandomEmoji = () => {
  const emojis = [
    '😀',
    '😃',
    '😄',
    '😁',
    '😆',
    '😅',
    '😂',
    '🤣',
    '😊',
    '😇',
    '🙂',
    '🙃',
    '😉',
    '😌',
    '😍',
    '🥰',
    '😘',
    '😗',
    '😙',
    '😚',
    '😋',
    '😛',
    '😝',
    '😜',
    '🤪',
    '🤨',
    '🧐',
    '🤓',
    '😎',
    '🤩',
    '🥳',
    '😏',
    '😒',
    '😞',
    '😔',
    '😟',
    '😕',
    '🙁',
    '☹️',
    '😣',
    '😖',
    '😫',
    '😩',
    '🥺',
    '😢',
    '😭',
    '😤',
    '😠',
    '😡',
    '🤬',
    '🤯',
    '😳',
    '🥵',
    '🥶',
    '😱',
    '😨',
    '😰',
    '😥',
    '😓',
    '🤗',
    '🤔',
    '🤭',
    '🤫',
    '🤥',
    '😶',
    '😐',
    '😑',
    '😬',
    '🙄',
    '😯',
    '😦',
    '😧',
    '😮',
    '😲',
    '🥱',
    '😴',
    '🤤',
    '😪',
    '😵',
    '🤐',
    '🥴',
    '🤢',
    '🤮',
    '🤧',
    '😷',
    '🤒',
    '🤕',
    '🤑',
    '🤠',
    '😈',
    '👿',
    '👹',
    '👺',
    '🤡',
    '👻',
    '👽',
    '👾',
    '🤖',
    '😺',
    '😸',
    '😹',
    '😻',
    '😼',
    '😽',
    '🙀',
    '😿',
    '😾',
    '💀',
    '☠️',
    '👋'
  ]
  return emojis[Math.floor(Math.random() * emojis.length)]
}
const onEmojiSelect = (emoji: string) => {
  currentEmoji.value = emoji
  show.value = false
  emit('update:model-value', emoji)
}
const onEmojiClick = () => {
  show.value = !show.value
}
onMounted(() => {
  currentEmoji.value = props.modelValue ? props.modelValue : getRandomEmoji()
})
const props = defineProps<{
  modelValue?: string
}>()
const emit = defineEmits(['update:model-value'])
</script>
