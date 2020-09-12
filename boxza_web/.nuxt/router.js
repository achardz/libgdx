import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2c2db4a3 = () => interopDefault(import('..\\src\\pages\\about.vue' /* webpackChunkName: "pages/about" */))
const _5ab5b91d = () => interopDefault(import('..\\src\\pages\\dash-board\\index.vue' /* webpackChunkName: "pages/dash-board/index" */))
const _3460f75f = () => interopDefault(import('..\\src\\pages\\how-to-play.vue' /* webpackChunkName: "pages/how-to-play" */))
const _a7c9e69c = () => interopDefault(import('..\\src\\pages\\shop\\index.vue' /* webpackChunkName: "pages/shop/index" */))
const _e266c426 = () => interopDefault(import('..\\src\\pages\\top-up.vue' /* webpackChunkName: "pages/top-up" */))
const _7a64e604 = () => interopDefault(import('..\\src\\pages\\dash-board\\item-store\\_id.vue' /* webpackChunkName: "pages/dash-board/item-store/_id" */))
const _4be58f68 = () => interopDefault(import('..\\src\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _2c2db4a3,
    props: false,
    name: "about"
  }, {
    path: "/dash-board",
    component: _5ab5b91d,
    props: false,
    name: "dash-board"
  }, {
    path: "/how-to-play",
    component: _3460f75f,
    props: false,
    name: "how-to-play"
  }, {
    path: "/shop",
    component: _a7c9e69c,
    props: false,
    name: "shop"
  }, {
    path: "/top-up",
    component: _e266c426,
    props: false,
    name: "top-up"
  }, {
    path: "/dash-board/item-store/:id",
    component: _7a64e604,
    props: true,
    name: "dash-board-item-store-id"
  }, {
    path: "/",
    component: _4be58f68,
    props: false,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
