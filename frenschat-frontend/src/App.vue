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
    userStore.login = await verifyToken()
  } catch(e) {
    userStore.login = null
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
  background: radial-gradient(var(--mauve), var(--peach));
  background-clip: text;
  color: transparent;
}
</style>
