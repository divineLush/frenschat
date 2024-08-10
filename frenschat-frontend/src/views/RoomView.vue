<template>
  <div class="room">
    <div class="messages-wrapper">
      <span
        class="message"
        v-for="msg in messages"
      >
        {{ msg }}
      </span>
    </div>

    <form class="message-form" @submit.prevent.stop="onSubmit">
      <input
        class="message-form__input"
        v-model.trim="newMessage"
        id="new-message"
        name="new-message"
        type="text"
      ></input>
      <button class="message-form__submit" type="submit">
        <SubmitArrow />
      </button>
    </form>

    <Error :msg="error" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import Socket from '../utils/socket.js'

import SubmitArrow from '../components/icons/SubmitArrow.vue'
import Error from '../components/Error.vue'

const route = useRoute()

const messages = ref([])
const newMessage = ref('')
const error = ref('')

const socket = ref(new Socket(
  route.params.id,
  e => { messages.value.push(e.data) },
))

const onSubmit = () => {
  if (!newMessage.value) {
    return
  }

  try {
    socket.value.send(newMessage.value)
  } catch(e) {
    error.value = e.message
  }
}
</script>

<style>
.room {
  height: calc(100vh - 70px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-width: 768px;
  margin: auto;
}

.messages-wrapper {
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.message {
  /* background: var(--crust); */
  background: radial-gradient(ellipse at top, var(--crust), var(--mantle));
  max-width: 40%;
  width: fit-content;
  padding: 4px 8px;
  border-radius: 16px;
}

.message-form {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
}

.message-form__input {
  width: 100%;
  background: transparent;
  border-color: var(--overlay2);
}

.message-form__submit {
  background: transparent;
  border: 0;
  margin: 0;
}

.message-form__submit svg {
  color: var(--text)
}

.message-form__submit:hover svg,
.message-form__submit:active svg {
  color: var(--pink)
}
</style>
