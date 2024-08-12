<template>
  <TheHeader />

  <RouterView />
</template>

<script setup>
import { onMounted } from 'vue'

import { useUserStore } from './stores/user'
import { verifyToken } from './utils/api'

import TheHeader from './components/TheHeader.vue'

onMounted(async () => {
  const userStore = useUserStore()

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

<style>
.app-header {
  display: flex;
  justify-content: space-between;
}

.app-logo {
  font-weight: bold;
  background: radial-gradient(var(--pink), var(--green));
  background-clip: text;
  color: transparent;
}
</style>
