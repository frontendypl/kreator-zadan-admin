import Vue from 'vue'
import VueRouter from 'vue-router'

import AuthRegisterView from '@/views/AuthRegisterView'
import AuthLoginView from "@/views/AuthLoginView";
import HomeView from "@/views/HomeView";
import ListDetailsView from "@/views/ListDetailsView";

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
    path: '/listy-zadan/:listId',
    name: 'ExerciseListView',
    component: ListDetailsView
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next)=>{
  const publicPages = ['/logowanie', '/rejestracja'];
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user');
  if (authRequired && !loggedIn) {
    next({name: 'AuthLoginView'});
  } else {
    next();
  }
})

export default router
