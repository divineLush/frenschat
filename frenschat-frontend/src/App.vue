<template>
  <TheHeader />

  <RouterView />
</template>

<script setup>
import { onMounted } from 'vue'

import { useUserStore } from './stores/user'
import { verifyToken } from './utils/api'

import TheHeader from './components/TheHeader.vue'

const userStore = useUserStore()

onMounted(async () => {
  try {
    const { email, username } = await verifyToken()
    userStore.email = email
    userStore.username = username
  } catch(e) {
    userStore.email = null
    userStore.username = null
  }
})
</script>
