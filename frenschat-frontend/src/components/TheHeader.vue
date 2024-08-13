<template>
  <header class="app-header">
    <router-link to="/" class="app-logo bold">FRENSCHAT</router-link>

    <div v-if="userStore.loggedIn">
      <div class="text-right">
        <span class="bold">{{ userStore.username }}, </span>
        <span class="bold">{{ userStore.email }}</span>
      </div>

      <div class="mt-1">
        <button class="account-btn" @click="handleSignOut">sign out</button>
        <button class="account-btn ml-2" @click="handleSuicide">suicide</button>
      </div>
    </div>

    <nav v-else>
        <router-link to="/login">login</router-link>
        <router-link class="ml-1" to="/register">register</router-link>
    </nav>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'

import { useUserStore } from '../stores/user'
import { signOut, suicide } from '../utils/api'

const userStore = useUserStore()
const router = useRouter()

const handleSignOut = async () => {
  try {
    await signOut()
    userStore.email = null
    userStore.username = null
    router.push({ path: '/' })
  } catch(e) {
    console.error(e)
  }
}

const handleSuicide = async () => {
  try {
    await suicide()
    userStore.email = null
    userStore.username = null
    router.push({ path: '/' })
  } catch(e) {
    console.error(e)
  }
}
</script>

<style>
.app-header {
  display: flex;
  justify-content: space-between;
}

.app-logo {
  padding-left: 0;
  background: radial-gradient(var(--pink), var(--lavender));
  background-clip: text;
  color: transparent;
}

.account-btn {
  background: transparent;
  color: var(--lavender);
  cursor: pointer;
  padding: 0;
  border: 0;
  border-radius: 32px;
  font-size: inherit;
  transition: transform .4s ease;
}

.account-btn:hover,
.account-btn:active {
  transform: scale(1.1);
}
</style>
