const express = require('express')
const Http = require('../../http')

const router = express()
// ประเภทกล่อง
router.get('/general/categories', (req, res) => {
  Http.get('/v1/categories')
    .then((response) => {
      res.send({ status: response.status, data: response.data.data })
    })
    .catch((e) => {
      res.status(e.response.status)
      res.send({ status: e.response.status, data: e.response.data })
    })
})
// ชั้นของ Item
router.get('/general/rates', (req, res) => {
  Http.get('/v1/rates')
    .then((response) => {
      res.send({ status: response.status, data: response.data.data })
    })
    .catch((e) => {
      res.status(e.response.status)
      res.send({ status: e.response.status, data: e.response.data })
    })
})

module.exports = router
