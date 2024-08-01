<template>
  <form class="register-form">
    <label for="register-email">Email</label>
    <input id="register-email" type="email" required></input>

    <label for="register-password">Password</label>
    <input id="register-password" type="password" required></input>

    <button type="submit">SIGN UP</button>
  </form>
</template>

<style>
.register-form {
  margin: 0 auto;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
