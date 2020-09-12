const express = require('express')
const Http = require('../../http')

const router = express()

router.post('/creat-box-type/categories', (req, res) => {
  Http.post('/v1/categories', req.body)
    .then((response) => {
      res.send({ status: response.status, data: response.data.data })
    })
    .catch((e) => {
      // console.error(e.response)
      res.status(e.response.status)
      res.send({ status: e.response.status, data: e.response.data })
    })
})
router.patch('/creat-box-type/categories', (req, res) => {
  Http.patch('/v1/categories', req.body)
    .then((response) => {
      res.send({ status: response.status, data: response.data })
    })
    .catch((e) => {
      // console.error(e.response)
      res.status(e.response.status)
      res.send({ status: e.response.status, data: e.response.data })
    })
})

router.patch('/delete/creat-box-type/categories', (req, res) => {
  Http.patch('/v1/categories', req.body)
    .then((response) => {
      res.send({ status: response.status, data: response.data })
    })
    .catch((e) => {
      res.status(e.response.status)
      res.send({ status: e.response.status, data: e.response.data })
    })
})
module.exports = router
