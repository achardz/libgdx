const express = require('express')
const Http = require('../../http')

const router = express()

router.post('/create-reward-box/box', (req, res) => {
  Http.post('/v1/boxs', req.body)
    .then((response) => {
      res.send({ status: response.status, data: response.data.message })
    })
    .catch((e) => {
      // console.error(e.response)
      res.status(e.response.status)
      res.send({ status: e.response.status, data: e.response.data })
    })
})
module.exports = router
