const express = require('express')
const Http = require('../../http')

const router = express()

router.post('/login', (req, res) => {
  Http.post('/auth/login/admin', req.body)
    .then((response) => {
      res.send({ status: response.status, data: response.data })
    })
    .catch((e) => {
      res.status(e.response.status)
      res.send({ status: e.response.status, data: e.response.data })
    })
})

router.get('/logout', (req, res) => {
  Http.get('/auth/logout')
    .then((response) => {
      res.send({ status: response.status, data: response.data.data })
    })
    .catch((e) => {
      res.status(e.response.status)
      res.send({ status: e.response.status, data: e.response.data })
    })
})
module.exports = router
