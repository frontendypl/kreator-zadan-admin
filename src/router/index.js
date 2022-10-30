import Vue from 'vue'
import VueRouter from 'vue-router'

import AuthRegisterView from '@/views/AuthRegisterView'
import AuthLoginView from "@/views/AuthLoginView";
import AuthResetPasswordView from "@/views/AuthResetPasswordView";
import AuthConfirmNewPasswordView from "@/views/AuthConfirmNewPasswordView";
import HomeView from "@/views/HomeView";
import ListView from "@/views/ListView";
import ExerciseView from "@/views/ExerciseView";
import PlayerView from "@/views/PlayerView";

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
  },
  {
    path: '/zmien-haslo',
    name: 'AuthResetPasswordView',
    component: AuthResetPasswordView
  },
  {
    path: '/potwierdz-nowe-haslo/:id',
    name: 'AuthConfirmNewPasswordView',
    component: AuthConfirmNewPasswordView
  },
  {
    path: '/listy-zadan/:listId',
    name: 'ListView',
    component: ListView
  },
  {
    path: '/listy-zadan/:listId/dodaj-zadanie',
    name: 'ExerciseView',
    component: ExerciseView
  },
  {
    path: '/listy-zadan/:listId/uczen/:playerId',
    name: 'PlayerView',
    component: PlayerView
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next)=>{
  const publicPages = ['/logowanie', '/rejestracja', '/zmien-haslo'];
  console.log('test', to.path.indexOf('/potwierdz-nowe-haslo')===-1)
  const authRequired = !publicPages.includes(to.path) && to.path.indexOf('/potwierdz-nowe-haslo') === -1
  const loggedIn = localStorage.getItem('user');
  if (authRequired && !loggedIn) {
    next({name: 'AuthLoginView'});
  } else {
    next();
  }
})

export default router
