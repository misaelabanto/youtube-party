<template>
  <EditProfile
    :model-value="profile"
    save-button-name="Guardar"
    @save="updateUser"
  />
</template>

<script setup lang="ts">
import EditProfile from '@/components/molecules/EditProfile.vue'
import type { User } from '@/interfaces/user'
import { useProfileStore } from '@/stores/profile'
import { storeToRefs } from 'pinia'

const profileStore = useProfileStore()
const { profile } = storeToRefs(profileStore)

const updateUser = (user: Omit<User, '_id'>) => {
  profileStore.updateUser(profile.value._id, user)
}
</script>
