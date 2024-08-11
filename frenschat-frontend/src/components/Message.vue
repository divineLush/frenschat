<template>
  <span
    class="message"
    :class="{ '_info': msg.type !== 'MESSAGE' }"
  >
    {{ msg.message }}
  </span>
</template>

<script setup>
const props = defineProps(['msg'])
</script>

<style>
.message {
  /* background: var(--crust); */
  background: radial-gradient(ellipse at top, var(--crust), var(--mantle));
  max-width: 40%;
  width: fit-content;
  padding: 4px 8px;
  border-radius: 16px;
}

.message._info {
  margin: auto;
  background: transparent;
  color: var(--lavender);
}
</style>
