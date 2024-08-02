<template>
  <form class="register-form" @submit.prevent="onSubmit">
    <label for="register-email">Email</label>
    <input v-model="email" id="register-email" type="email" required></input>

    <label for="register-password">Password</label>
    <input v-model="password" id="register-password" type="password" required></input>

    <button type="submit">SIGN UP</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const onSubmit = () => {
  console.log(this.email, this.password)
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
</style>
