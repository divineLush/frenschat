<template>
  <main>
    <h2 class="motto mt-4 text-center">
      CHAT WITH FRENS<br>
      HAVE FUN<br>
      TOUCH GRASS<br>
      PONDER THY ORB
    </h2>

    <nav v-if="userStore.loggedIn" class="mt-4 text-center">
      <router-link to="/join">JOIN ROOM</router-link>
      <router-link class="ml-1" :to="`/room/${roomId}`">CREATE ROOM</router-link>
    </nav>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'

import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const roomId = ref(uuidv4())
</script>

<style>
.motto {
  color: var(--green);
}
</style>
