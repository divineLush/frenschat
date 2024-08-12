<template>
  <form class="join-form" autocomplete="on" @submit.prevent.stop="onSubmit">
    <template v-if="!userStore.loggedIn">
      <label for="username">Username</label>
      <input
        v-model.trim="username"
        id="username"
        name="username"
        type="text"
        autocomplete="off"
        required
      ></input>
    </template>

    <label for="room-id">Room ID</label>
    <input
      v-model.trim="roomId"
      id="room-id"
      name="room-id"
      type="text"
      autocomplete="off"
      required
    ></input>

    <button class="join-room-btn mt-2" type="submit">JOIN</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()

const username = ref('')
const roomId = ref('')

const router = useRouter()

const onSubmit = async () => {
  if (!userStore.loggedIn) {
    userStore.username = username.value
  }

  router.push({ path: `/room/${roomId.value}` })
}
</script>

<style>
.join-form {
  margin: 0 auto;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.join-room-btn {
  background: radial-gradient(ellipse at top, var(--lavender), transparent);
}
</style>
