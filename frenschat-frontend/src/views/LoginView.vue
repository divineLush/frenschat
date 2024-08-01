<template>
  <form class="login-form">
    <label for="login-email">Email</label>
    <input id="login-email" type="email" required></input>

    <label for="login-password">Password</label>
    <input id="login-password" type="password" required></input>

    <button type="submit">SIGN IN</button>
  </form>
</template>

<style>
.login-form {
  margin: 0 auto;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
