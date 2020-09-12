/* eslint-disable */
const Cookie = process.client ? require('js-cookie') : undefined

export default ({ app, $axios, store }) => {
  let axiosConfig = false
  class CheckStorage {
    initialStore(to) {
      let profile = store.getters['auth/getProfile']
      if (profile) {
        // เช็ค timestemp เพื่อ logout อัตโนมัติทุก 8 โมงเช้า
        let autoLogout = profile.timestamp
        if (Math.floor(Date.now() / 1000) > autoLogout) {
          Cookie.remove('auth')
          store.commit('setAuth', null)
          app.router.push('/')
        }
      }
    }
    axiosConfiguration(to) {
      let token = store.getters['auth/getProfile'] ? `Bearer ${store.getters['auth/getProfile'].accessToken}` : ''
      $axios.defaults.headers = {
        'Content-Type': 'application/json',
        'Authorization': token
      }
      axiosConfig = true
    }
  }
  app.router.afterEach(async (to, from) => {
    const checkStorage = new CheckStorage()
    await checkStorage.initialStore(to)
    checkStorage.axiosConfiguration(to)
  })
}