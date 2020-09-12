import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _116f2364 = () => interopDefault(import('..\\src\\pages\\about.vue' /* webpackChunkName: "pages_about" */))
const _f7ebe344 = () => interopDefault(import('..\\src\\pages\\dash-board\\index.vue' /* webpackChunkName: "pages_dash-board_index" */))
const _33ea9160 = () => interopDefault(import('..\\src\\pages\\how-to-play.vue' /* webpackChunkName: "pages_how-to-play" */))
const _51b9074c = () => interopDefault(import('..\\src\\pages\\top-up.vue' /* webpackChunkName: "pages_top-up" */))
const _108d04ff = () => interopDefault(import('..\\src\\pages\\dash-board\\item-store\\_id.vue' /* webpackChunkName: "pages_dash-board_item-store__id" */))
const _3126fe29 = () => interopDefault(import('..\\src\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

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
    component: _116f2364,
    props: false,
    name: "about"
  }, {
    path: "/dash-board",
    component: _f7ebe344,
    props: false,
    name: "dash-board"
  }, {
    path: "/how-to-play",
    component: _33ea9160,
    props: false,
    name: "how-to-play"
  }, {
    path: "/top-up",
    component: _51b9074c,
    props: false,
    name: "top-up"
  }, {
    path: "/dash-board/item-store/:id",
    component: _108d04ff,
    props: true,
    name: "dash-board-item-store-id"
  }, {
    path: "/",
    component: _3126fe29,
    props: false,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
