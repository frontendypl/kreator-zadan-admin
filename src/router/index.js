import Vue from 'vue'
import VueRouter from 'vue-router'

import AuthRegisterView from '@/views/AuthRegisterView'
import AuthLoginView from "@/views/AuthLoginView";
import HomeView from "@/views/HomeView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView //TODO zrobić widok dla zalogowanego, przekierowywac jesli niezalogowany
  },
  {
    path: '/rejestracja',
    name: 'AuthRegisterView',
    component: AuthRegisterView
  },
  {
    path: '/logowanie',
    name: 'AuthLoginView',
    component: AuthLoginView
  }
]

const router = new VueRouter({
  routes
})

export default router
