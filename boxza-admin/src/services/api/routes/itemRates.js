const express = require('express')
const Http = require('../../http')

const router = express()

router.patch('/item-rates/rates', (req, res) => {
  Http.patch('/v1/rates', req.body)
    .then((response) => {
      res.send({ status: response.status, data: response.data.data })
    })
    .catch((e) => {
      // console.error(e.response)
      res.status(e.response.status)
      res.send({ status: e.response.status, data: e.response.data })
    })
})

module.exports = router
