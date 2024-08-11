<template>
  <header class="app-header">
    <router-link to="/" class="app-logo">FRENSCHAT</router-link>
    <nav>
      <template v-if="userStore.loggedIn">
        <span>{{ userStore.username }}, </span>
        <span>{{ userStore.email }}</span>
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
