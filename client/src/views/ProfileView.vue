<template>
  <EditProfile
    :model-value="profile"
    save-button-name="Guardar"
    @save="updateUser"
    :loading="loading"
  />
</template>

<script setup lang="ts">
import EditProfile from '@/components/molecules/EditProfile.vue'
import type { User } from '@/interfaces/user'
import { useProfileStore } from '@/stores/profile'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const profileStore = useProfileStore()
const { profile } = storeToRefs(profileStore)
const loading = ref<boolean>(false)

const updateUser = async (user: Omit<User, '_id'>) => {
  loading.value = true
  await profileStore.updateUser(profile.value._id, user)
  profileStore.saveProfile({
    _id: profile.value._id,
    emoji: user.emoji,
    name: user.name
  })
  loading.value = false
}
</script>
