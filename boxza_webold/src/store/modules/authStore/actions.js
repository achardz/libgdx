const cookieparser = process.server ? require('cookieparser') : undefined

export default {
  nuxtServerInit({ commit }, { req, app }) {
    let auth = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        auth = JSON.parse(parsed.boxzaAuth)
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('setAuth', auth)
  }
}
