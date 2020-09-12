const Axios = require('axios')

const axios = Axios.create({
  baseURL: 'http://157.230.45.37:3000/api',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*'
  },
  retry: {
    retries: 3
  }
})

axios.interceptors.request.use((config) => {
  return config
},
  (response) => {
    return response
  }
)

module.exports = axios
