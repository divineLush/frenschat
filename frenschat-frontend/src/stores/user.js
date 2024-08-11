import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const email = ref(null)
  const username = ref(null)

  const loggedIn = computed(() => email.value && username.value)

  return { email, username, loggedIn }
})
