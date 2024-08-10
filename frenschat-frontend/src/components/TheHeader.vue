<template>
  <header class="app-header">
    <router-link to="/" class="app-logo">FRENSCHAT</router-link>
    <nav>
      <template v-if="userStore.login">
        <span>{{ userStore.login }}</span>
      </template>
      <template v-else>
        <router-link to="/login">login</router-link>
        <router-link class="ml-1" to="/register">register</router-link>
      </template>
    </nav>
  </header>
</template>

<script setup>
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
</script>
