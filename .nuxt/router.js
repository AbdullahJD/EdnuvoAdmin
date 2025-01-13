import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _46824edc = () => interopDefault(import('..\\pages\\funds.vue' /* webpackChunkName: "pages/funds" */))
const _96dacbc8 = () => interopDefault(import('..\\pages\\issues.vue' /* webpackChunkName: "pages/issues" */))
const _3267fb12 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _2d667a76 = () => interopDefault(import('..\\pages\\notifications.vue' /* webpackChunkName: "pages/notifications" */))
const _73fa155c = () => interopDefault(import('..\\pages\\projects.vue' /* webpackChunkName: "pages/projects" */))
const _628e3996 = () => interopDefault(import('..\\pages\\users.vue' /* webpackChunkName: "pages/users" */))
const _cb928760 = () => interopDefault(import('..\\pages\\violations.vue' /* webpackChunkName: "pages/violations" */))
const _1d245f60 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _d53b8520 = () => interopDefault(import('..\\pages\\chat\\_id.vue' /* webpackChunkName: "pages/chat/_id" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/funds",
    component: _46824edc,
    name: "funds"
  }, {
    path: "/issues",
    component: _96dacbc8,
    name: "issues"
  }, {
    path: "/login",
    component: _3267fb12,
    name: "login"
  }, {
    path: "/notifications",
    component: _2d667a76,
    name: "notifications"
  }, {
    path: "/projects",
    component: _73fa155c,
    name: "projects"
  }, {
    path: "/users",
    component: _628e3996,
    name: "users"
  }, {
    path: "/violations",
    component: _cb928760,
    name: "violations"
  }, {
    path: "/",
    component: _1d245f60,
    name: "index"
  }, {
    path: "/chat/:id?",
    component: _d53b8520,
    name: "chat-id"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
