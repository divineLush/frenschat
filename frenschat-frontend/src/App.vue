<script setup>
import TheHeader from './components/TheHeader.vue'
</script>

<template>
  <TheHeader />

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
