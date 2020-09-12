const express = require('express')
const Http = require('../../http')

const router = express()

router.get('/user-detail/search-users', (req, res) => {
  Http.get('/v1/users', { params: req.query })
    .then((response) => {
      res.send({ status: response.status, data: response.data.data })
    })
    .catch((e) => {
      res.status(e.response.status)
      res.send({ status: e.response.status, data: e.response.data })
    })
})

router.get('/user-detail/top-up', (req, res) => {
  Http.get('/profile/topup', { params: req.query })
    .then((response) => {
      res.send({ status: response.status, data: response.data.data })
    })
    .catch((e) => {
      res.status(e.response.status)
      res.send({ status: e.response.status, data: e.response.data })
    })
})

module.exports = router
