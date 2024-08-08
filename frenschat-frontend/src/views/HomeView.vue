<template>
  <main>
    <h2 class="motto mt-4 text-center">
      CHAT WITH FRENS<br>
      HAVE FUN<br>
      TOUCH GRASS<br>
      PONDER THY ORB
    </h2>

    <nav class="mt-4 text-center">
      <router-link to="/join">JOIN ROOM</router-link>
      <router-link class="ml-1" to="/create">CREATE ROOM</router-link>
    </nav>
  </main>
</template>

<style>
.motto {
  color: var(--green);
}
</style>
