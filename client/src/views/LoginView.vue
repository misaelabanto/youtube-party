<template>
  <div>
    <EditProfile
      :model-value="profile"
      save-button-name="Ingresar"
      @save="saveUser"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import EditProfile from '@/components/molecules/EditProfile.vue'
import type { User } from '@/interfaces/user'
import { useProfileStore } from '@/stores/profile'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const { profile, createUser, saveProfile } = useProfileStore()
const loading = ref<boolean>(false)

const saveUser = async (user: Omit<User, 'id'>) => {
  loading.value = true
  const { data } = await createUser({
    emoji: user.emoji,
    name: user.name
  })
  if (data.value) {
    saveProfile(data.value)
  }
  loading.value = false
  router.push({ name: 'queue' })
}
</script>
