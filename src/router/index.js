import Vue from 'vue'
import VueRouter from 'vue-router'

import AuthRegisterView from '../views/AuthRegisterView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: AuthRegisterView
  }
]

const router = new VueRouter({
  routes
})

export default router
