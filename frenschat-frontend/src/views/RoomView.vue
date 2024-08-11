<template>
  <div class="room">
    <div class="messages-wrapper" ref="messagesWrapper">
      <Message v-for="msg in messages" :msg="msg" />
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
import { ref, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

import Socket from '../utils/socket.js'

import SubmitArrow from '../components/icons/SubmitArrow.vue'
import Message from '../components/Message.vue'
import Error from '../components/Error.vue'

import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const route = useRoute()

const messages = ref([])
const newMessage = ref('')
const error = ref('')

const messagesWrapper = ref(null)

const socket = ref(new Socket(
  route.params.id,
  userStore.username,
  e => {
    const msg = JSON.parse(e.data)
    messages.value.push(msg)

    if (msg.username !== userStore.username) {
      return
    }

    setTimeout(() => {
      messagesWrapper.value.scroll({
        top: messagesWrapper.value.scrollHeight,
        behavior: 'smooth'
      })
    }, 0)
  },
))

onUnmounted(() => {
  socket.value.close()
})

const onSubmit = () => {
  if (!newMessage.value) {
    return
  }

  try {
    socket.value.sendMessage(newMessage.value)
    newMessage.value = ''
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
  padding: 0 8px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
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
