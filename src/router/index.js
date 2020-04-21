import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

function lazyLoad(view){
  return() => import(`@/views/${view}.vue`)
}

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/documents',
    name: 'Documents',
    component: lazyLoad('Documents')
  },
  {
    path: '/login',
    name: 'Login',
    component: lazyLoad('Auth/Login')
  },
  {
    path: '/signup/:superu/:email',
    name: 'Signup',
    component: lazyLoad('Auth/Signup')
  },
  {
    path: '/add-user',
    name: 'AddUser',
    component: lazyLoad('AddUser')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
