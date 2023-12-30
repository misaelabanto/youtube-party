<template>
  <div class="mb-16">
    <RouterView />
    <BottomSheet />
  </div>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router'
import BottomSheet from '@/components/molecules/BottomSheet.vue'
</script>
