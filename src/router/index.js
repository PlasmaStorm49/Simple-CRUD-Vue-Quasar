import { defineRouter } from '#q-app/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import routes from './routes'
import { useSetSession } from 'stores/session'

export default defineRouter(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  //Redireciona o usuários caso ele não esteja logado
  Router.beforeEach((to, from, next) => {
    let sessionStatus = useSetSession()

    if (to.meta.needsLogIn && !sessionStatus.isLoggedIn) {
      next('/login')
      return
    }
    if (to.meta.onlyLoggedOut && sessionStatus.isLoggedIn) {
      next('/')
      return
    }
    next()
  })

  return Router
})
