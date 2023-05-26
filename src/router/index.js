import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import talk from '@/components/gpt/talk'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  // base: '/authPage/',
  routes: [
    {
      path: '/',
      redirect: "/login"
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/talk',
      name: 'talk',
      component: talk
    }
  ]
})
