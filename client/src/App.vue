<script setup lang="ts">
import YSpinner from '@/components/atoms/YSpinner.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <Suspense>
    <RouterView />
    <template #fallback>
      <div class="flex justify-center items-center h-screen">
        <YSpinner />
      </div>
    </template>
  </Suspense>
</template>
