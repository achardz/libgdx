const express = require('express')
const Http = require('../../http')

const router = express()
// บัญชีปลายทาง
router.get('/general/ledger', (req, res) => {
  Http.get('/accounting/operation/ledger')
    .then((response) => {
      res.send({ status: response.status, data: response.data })
    })
    .catch((e) => {
      res.status(e.response.status)
      res.send({ status: e.response.status, data: e.response.data })
    })
})

router.get('/general/lucky-user', (req, res) => {
  Http.get('/check/lucky', { params: req.query })
    .then((response) => {
      res.send({ status: response.status, data: response.data.data })
    })
    .catch((e) => {
      res.status(e.response.status)
      res.send({ status: e.response.status, data: e.response.data })
    })
})

router.get('/general/money', (req, res) => {
  Http.get('/v1/users/money', { params: req.query })
    .then((response) => {
      res.send({ status: response.status, data: response.data })
    })
    .catch((e) => {
      res.status(e.response.status)
      res.send({ status: e.response.status, data: e.response.data })
    })
})

// sell item
router.patch('/general/sell-item', (req, res) => {
  Http.patch('/profile/storage', req.body)
    .then((response) => {
      res.send({ status: response.status, data: response.data })
    })
    .catch((e) => {
      res.status(e.response.status)
      res.send({ status: e.response.status, data: e.response.data })
    })
})

module.exports = router
