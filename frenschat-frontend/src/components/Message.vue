<template>
  <span
    class="message"
    :class="{
      '_info': !isTypeMessage,
      '_you': isTypeMessage && msg.login !== userStore.username,
    }"
  >
    {{ msg.message }}
  </span>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '../stores/user'

import messageTypes from '../utils/messageTypes'

const userStore = useUserStore()

const props = defineProps(['msg'])

const isTypeMessage = computed(() => props.msg.type === messageTypes.MESSAGE)
</script>

<style>
.message {
  /* background: var(--crust); */
  background: radial-gradient(ellipse at top, var(--surface0), var(--crust));
  max-width: 40%;
  width: fit-content;
  padding: 4px 8px;
  border-radius: 16px;
}

.message._info {
  margin: auto;
  background: transparent;
  color: var(--pink);
}

.message._you {
  margin-left: auto;
  color: var(--base);
  background: radial-gradient(ellipse at top, var(--lavender), var(--pink));
}
</style>
