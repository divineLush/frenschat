<template>
  <div class="room">
    <p
      class="message"
      v-for="msg in messages"
    >
      {{ msg }}
    </p>
  </div>
  <button @click="send">></button>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Socket from '../utils/socket.js'

const messages = ref([])
const socket = ref(new Socket(e => {
  messages.value.push(e.data)
}))

const send = () => {
  socket.value.send(123)
}
</script>

<style>
.login-form {
  margin: 0 auto;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sign-in-btn {
  background: radial-gradient(var(--green), transparent);
}
</style>
