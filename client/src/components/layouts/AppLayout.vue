<template>
  <div class="mb-16">
    <RouterView />
    <BottomSheet
      @update:active="
        (active: 'search' | 'queue' | 'profile') => (tabActive = active)
      "
      :active="tabActive"
    />
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import BottomSheet from '../molecules/BottomSheet.vue'

const { tabActive } = storeToRefs(useAppStore())

const route = useRoute()

onMounted(() => {
  console.log(route.path)

  if (route.path === '/') {
    tabActive.value = 'search'
  } else if (route.path === '/queue') {
    tabActive.value = 'queue'
  } else if (route.path === '/profile') {
    tabActive.value = 'profile'
  }
})
</script>
