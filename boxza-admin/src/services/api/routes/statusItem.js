const express = require('express')
const Http = require('../../http')

const router = express()
// ดูของที่ค้างส่ง
router.get('/status-item/stock', (req, res) => {
  Http.get('/v1/stock')
    .then((response) => {
      res.send({ status: response.status, data: response.data.data })
    })
    .catch((e) => {
      res.status(e.response.status)
      res.send({ status: e.response.status, data: e.response.data })
    })
})

router.patch('/status-item/tracking', (req, res) => {
  Http.patch('/v1/stock', req.body)
    .then((response) => {
      res.send({ status: response.status, data: response.data.data })
    })
    .catch((e) => {
      res.status(e.response.status)
      res.send({ status: e.response.status, data: e.response.data })
    })
})
module.exports = router
