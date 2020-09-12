/* eslint-disable */
const Cookie = process.client ? require('js-cookie') : undefined

export default ({ app, $axios, store }) => {
  let axiosConfig = false
  class CheckStorage {
    initialStore(to) {
      let profile = store.getters['auth/getProfile']
      if (profile) {
        $axios.defaults.headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${profile.accessToken}`
        }
        const getMoney = () => {
          $axios.$get('/general/money', { params: { 'id': profile.id } })
            .then((res) => {
              setImmediate(() => {
                store.state.authStore.auth.gold = res.data.gold
              })
            })
            .catch((e) => {
              console.error(e.response.data.data.message)
            })
        }
        $axios.$get('user-profile/profile', { params: { 'user_id': profile.id } })
          .then((res) => {
            setImmediate(() => {
              store.state.authStore.auth.email = res.data.user.email
              store.state.authStore.auth.userPic = res.data.user.user_pic
            })
            getMoney()
          })
          .catch((e) => {
            console.error(e.response.data.data.message)
          })
        // เช็ค timestemp เพื่อ logout อัตโนมัติทุก 8 โมงเช้า
        let autoLogout = profile.timestamp
        if (Math.floor(Date.now() / 1000) > autoLogout) {
          Cookie.remove('boxzaAuth')
          store.commit('setAuth', null)
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
