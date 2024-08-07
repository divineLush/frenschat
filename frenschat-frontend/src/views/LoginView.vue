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

    <button type="submit" class="sign-in-btn">SIGN IN</button>
  </form>

  <p v-if="error" class="error">{{ error }}</p>
</template>

<script setup>
import { ref } from 'vue'
import { signIn } from '../utils/api'
import { useUserStore } from '../stores/user'

const login = ref('')
const password = ref('')
const error = ref('')

const userStore = useUserStore()

const onSubmit = async () => {
  try {
    const res = await signIn(login.value, password.value)
    console.log(res)
  } catch(err) {
    console.log('error', err.message)
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
  background: radial-gradient(var(--green), transparent);
}

.error {
  text-align: center;
  color: var(--red);
}
</style>
