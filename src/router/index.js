import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import {auth} from '@/firebase/init'

function lazyLoad(view){
  return() => import(`@/views/${view}.vue`)
}

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
      progress: {
        func: [
          {call: 'color', modifier: 'temp', argument: '#ffb000'},
          {call: 'fail', modifier: 'temp', argument: '#6e0000'},
          {call: 'location', modifier: 'temp', argument: 'top'},
          {call: 'transition', modifier: 'temp', argument: {speed: '1.5s', opacity: '0.6s', termination: 400}}
        ]
      }
    }
  },
  {
    path: '/documents',
    name: 'Documents',
    component: lazyLoad('Documents'),
    meta: {
      requiresAuth: true,
      progress: {
        func: [
          {call: 'color', modifier: 'temp', argument: '#ffb000'},
          {call: 'fail', modifier: 'temp', argument: '#6e0000'},
          {call: 'location', modifier: 'temp', argument: 'top'},
          {call: 'transition', modifier: 'temp', argument: {speed: '1.5s', opacity: '0.6s', termination: 400}}
        ]
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: lazyLoad('Auth/Login'),
    meta: {
      progress: {
        func: [
          {call: 'color', modifier: 'temp', argument: '#ffb000'},
          {call: 'fail', modifier: 'temp', argument: '#6e0000'},
          {call: 'location', modifier: 'temp', argument: 'top'},
          {call: 'transition', modifier: 'temp', argument: {speed: '1.5s', opacity: '0.6s', termination: 400}}
        ]
      }
    }
  },
  {
    path: '/signup/:superu/:email',
    name: 'Signup',
    component: lazyLoad('Auth/Signup'),
    meta: {
      progress: {
        func: [
          {call: 'color', modifier: 'temp', argument: '#ffb000'},
          {call: 'fail', modifier: 'temp', argument: '#6e0000'},
          {call: 'location', modifier: 'temp', argument: 'top'},
          {call: 'transition', modifier: 'temp', argument: {speed: '1.5s', opacity: '0.6s', termination: 400}}
        ]
      }
    }
  },
  {
    path: '/add-user',
    name: 'AddUser',
    component: lazyLoad('AddUser'),
    meta: {
      requiresAuth: true,
      progress: {
        func: [
          {call: 'color', modifier: 'temp', argument: '#ffb000'},
          {call: 'fail', modifier: 'temp', argument: '#6e0000'},
          {call: 'location', modifier: 'temp', argument: 'top'},
          {call: 'transition', modifier: 'temp', argument: {speed: '1.5s', opacity: '0.6s', termination: 400}}
        ]
      }
    }
  },
  {
    path: '/add-project',
    name: 'AddProject',
    component: lazyLoad('AddProject'),
    meta: {
      requiresAuth: true,
      progress: {
        func: [
          {call: 'color', modifier: 'temp', argument: '#ffb000'},
          {call: 'fail', modifier: 'temp', argument: '#6e0000'},
          {call: 'location', modifier: 'temp', argument: 'top'},
          {call: 'transition', modifier: 'temp', argument: {speed: '1.5s', opacity: '0.6s', termination: 400}}
        ]
      }
    }
  },
  {
    path: '/manage-users',
    name: 'ManageUsers',
    component: lazyLoad('ManageUsers'),
    meta: {
      requiresAuth: true,
      progress: {
        func: [
          {call: 'color', modifier: 'temp', argument: '#ffb000'},
          {call: 'fail', modifier: 'temp', argument: '#6e0000'},
          {call: 'location', modifier: 'temp', argument: 'top'},
          {call: 'transition', modifier: 'temp', argument: {speed: '1.5s', opacity: '0.6s', termination: 400}}
        ]
      }
    }
  },
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some( rec => rec.meta.requiresAuth)){
    let user = auth.currentUser
    if(user){
      next()
    }
    else{
      next({name: 'Login'})
    }
  }
  else{
    next()
  }
})

export default router
