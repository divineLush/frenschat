<template>
  <form class="login-form">
    <label>Email</label>
    <input placeholder="foo@bar.com"></input>

    <label>Password</label>
    <input placeholder="123qwe!" type="password"></input>

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
