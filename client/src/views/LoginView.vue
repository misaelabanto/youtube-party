<template>
  <div>
    <EditProfile
      :model-value="profile"
      save-button-name="Ingresar"
      @save="saveUser"
    />
  </div>
</template>

<script setup lang="ts">
import EditProfile from '@/components/molecules/EditProfile.vue'
import type { User } from '@/interfaces/user'
import { useProfileStore } from '@/stores/profile'
import { useRouter } from 'vue-router'

const router = useRouter()

const { profile, createUser, saveProfile } = useProfileStore()

const saveUser = async (user: Omit<User, 'id'>) => {
  const { data } = await createUser(user)
  if (data.value) {
    saveProfile(data.value)
  }
  router.push({ name: 'queue' })
}
</script>
