<template>
  <TheHeader />

  <RouterView />
</template>

<script setup>
import { onMounted } from 'vue'

import { verifyToken } from './utils/api'
import { useUserStore } from './stores/user'

import TheHeader from './components/TheHeader.vue'

const userStore = useUserStore()

onMounted(async () => {
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
