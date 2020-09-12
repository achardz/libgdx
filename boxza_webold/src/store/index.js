import Vuex from 'vuex'
import authModule from './modules/authStore'

export default () => new Vuex.Store({
  stateFactory: true,
  namespaced: true,
  modules: {
    authStore: authModule
  }
})
