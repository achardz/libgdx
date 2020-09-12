const express = require('express')
const Http = require('../../http')

const router = express()

router.post('/top-up/truemoney', (req, res) => {
    Http.post('/truemoney/pay', req.body)
        .then((response) => {
            res.send({ status: response.status, data: response.data })
        })
        .catch((e) => {
            res.status(e.response.status)
            res.send({ status: e.response.status, data: e.response.data })
        })
})

router.post('/top-up/paypal', (req, res) => {
    Http.post('/paypal/pay', req.body)
        .then((response) => {
            res.send({ status: response.status, data: response.data })
        })
        .catch((e) => {
            res.status(e.response.status)
            res.send({ status: e.response.status, data: e.response.data })
        })
})

module.exports = router
