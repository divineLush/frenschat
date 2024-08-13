<template>
  <form class="login-form" autocomplete="on" @submit.prevent.stop="onSubmit">
    <label for="login-email-username">Email or username</label>
    <input
      v-model.trim="login"
      id="login-email-username"
      name="login-email-username"
      type="text"
      required
    ></input>

    <label for="login-password">Password</label>
    <input
      v-model.trim="password"
      id="login-password"
      name="login-password"
      type="password"
      required
    ></input>

    <button type="submit" class="sign-in-btn mt-2">SIGN IN</button>
  </form>

  <Error :msg="error" />
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { signIn } from '../utils/api'
import { useUserStore } from '../stores/user'

import Error from '../components/Error.vue'

const login = ref('')
const password = ref('')
const error = ref('')

const userStore = useUserStore()
const router = useRouter()

const onSubmit = async () => {
  try {
    const { email, username } = await signIn(login.value, password.value)
    userStore.email = email
    userStore.username = username
    router.push('/')
  } catch(err) {
    userStore.email = null
    userStore.username = null
    error.value = err.message
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
  background: radial-gradient(ellipse at top, var(--lavender), transparent);
}
</style>
