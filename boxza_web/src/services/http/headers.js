const express = require('express')
const Http = require('../http')
const router = express()

router.use(function (req, res, next) {
  if (req.headers.authorization) {
    Http.defaults.headers.common['Authorization'] = req.headers.authorization
  }
  next()
})

module.exports = router
