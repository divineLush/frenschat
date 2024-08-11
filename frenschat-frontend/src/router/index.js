import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import JoinView from '../views/JoinView.vue'
import RoomView from '../views/RoomView.vue'

import { useUserStore } from '../stores/user'
import { verifyToken } from '../utils/api'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/join',
      name: 'join',
      component: JoinView
    },
    {
      path: '/room/:id',
      name: 'room',
      component: RoomView
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    },
  ]
})

router.beforeEach(async ({ name }) => {

  const isProtectedRoute = ['room', 'join']
    .find(routeName => routeName === name)

  if (isProtectedRoute) {
    const userStore = useUserStore()

    try {
      const { email, username } = await verifyToken()
      userStore.email = email
      userStore.username = username
    } catch(e) {
      userStore.email = email
      userStore.username = username
      return '/login'
    }
  }

  return true
})

export default router
