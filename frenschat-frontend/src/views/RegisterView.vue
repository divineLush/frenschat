<template>
  <form class="register-form" autocomplete="on" @submit.prevent.stop="onSubmit">
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

    <button type="submit" class="sign-up-btn">SIGN UP</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { signUp } from '../utils/api'

const email = ref('')
const password = ref('')

const onSubmit = () => {
  signUp(email.value, password.value)
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
