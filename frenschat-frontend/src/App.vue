<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="app-header">
    <span class="app-logo">FRENSCHAT</span>
    <nav>
      <router-link to="/login">login</router-link>
      <router-link class="ml-1" to="/register">register</router-link>
    </nav>
  </header>

  <RouterView />
</template>

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
