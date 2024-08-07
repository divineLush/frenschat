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

  <p v-if="error" class="error">{{ error }}</p>
</template>

<script setup>
import { ref } from 'vue'
import { signIn } from '../utils/api'
import { useUserStore } from '../stores/user'

const email = ref('')
const password = ref('')
const error = ref('')

const userStore = useUserStore()

const onSubmit = async () => {
  try {
    const res = await signIn(email.value, password.value)
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
