<template>
  <form class="join-form" autocomplete="on" @submit.prevent.stop="onSubmit">
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

const roomId = ref('')

const router = useRouter()

const onSubmit = async () => {
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
