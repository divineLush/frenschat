<template>
  <p v-if="msg" class="error">{{ msg }}</p>
</template>

<script setup>
const props = defineProps(['msg'])
</script>
