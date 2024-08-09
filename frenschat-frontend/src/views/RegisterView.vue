<template>
  <form class="register-form" autocomplete="on" @submit.prevent.stop="onSubmit">
    <label for="register-email">Username</label>
    <input
      v-model.trim="username"
      id="register-username"
      name="register-username"
      type="text"
      required
    ></input>

    <label for="register-email">Email</label>
    <input
      v-model.trim="email"
      id="register-email"
      name="register-email"
      type="email"
      required
    ></input>

    <label for="register-password">Password</label>
    <input
      v-model.trim="password"
      id="register-password"
      name="register-password"
      type="password"
      required
    ></input>

    <button type="submit" class="sign-up-btn mt-2">SIGN UP</button>
  </form>

  <Error :msg="error" />
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { signUp } from '../utils/api'

import Error from '../components/Error.vue'

const username = ref('')
const email = ref('')
const password = ref('')
const error = ref('')

const router = useRouter()

const onSubmit = async () => {
  try {
    await signUp(username.value, email.value, password.value)
    router.push('/')
  } catch(err) {
    error.value = err.message
  }
}
</script>

<style>
.register-form {
  margin: 0 auto;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sign-up-btn {
  background: radial-gradient(var(--pink), transparent);
}
</style>
