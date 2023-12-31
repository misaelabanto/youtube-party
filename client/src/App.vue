<template>
  <div class="mb-20">
    <YAlert />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import YAlert from '@/components/atoms/YAlert.vue'
import { RouterView } from 'vue-router'
</script>
