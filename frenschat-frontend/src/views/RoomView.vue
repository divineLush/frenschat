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

  <p v-if="error" class="error">{{ error }}</p>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Socket from '../utils/socket.js'

const messages = ref([])
const error = ref('')
const socket = ref(new Socket(e => {
  messages.value.push(e.data)
}))

const send = () => {
  try {
    socket.value.send(123)
  } catch(e) {
    error.value = e.message
  }
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
