import Vue from 'vue'
import Router from 'vue-router'

import talk from '@/components/gpt/talk'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  // base: '/authPage/',
  routes: [
    {
      path: '/',
      redirect: "/talk"
    },
    {
      path: '/talk',
      name: 'talk',
      component: talk
    }
  ]
})
