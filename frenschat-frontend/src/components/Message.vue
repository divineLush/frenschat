<template>
  <span
    class="message"
    :class="{
      '_info': !isTypeMessage,
      '_you': isTypeMessage && isMine,
    }"
  >
    <span class="author" v-if="isTypeMessage && !isMine">
      {{ msg.username }}
    </span>
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
const isMine = computed(() => props.msg.username === userStore.username)
</script>

<style>
.message {
  background: radial-gradient(ellipse at bottom, var(--crust), transparent);
  max-width: 40%;
  width: fit-content;
  padding: 4px 8px;
  border-radius: 16px;
}

.message._info {
  margin: auto;
  background: transparent;
  max-width: none;
  color: var(--pink);
}

.message._you {
  margin-left: auto;
  color: var(--base);
  background: radial-gradient(ellipse at top, var(--lavender), var(--pink));
}

.author {
  display: block;
  font-size: 14px;
  background: radial-gradient(var(--pink), var(--blue));
  background-clip: text;
  color: transparent;
}

@media (max-width: 768px) {
  .author {
    font-size: 12px;
  }
}
</style>
