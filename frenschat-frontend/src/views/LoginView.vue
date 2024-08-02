<template>
  <form class="login-form" autocomplete="on" @submit.prevent.stop="onSubmit">
    <label for="login-email">Email</label>
    <input
      v-model.trim="email"
      id="login-email"
      name="login-email"
      type="email"
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
</template>

<script setup>
import { ref } from 'vue'
import { signIn } from '../utils/api'

const email = ref('')
const password = ref('')

const onSubmit = () => {
  signIn(email.value, password.value)
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
