const express = require('express')
const Http = require('../../http')

const router = express()

router.post('/msg/get', (req, res) => {
    Http.post('/chat/get', req.body)
        .then((response) => {
            res.send({ status: response.status, data: response.data })
        })
        .catch((e) => {
            res.status(e.response.status)
            res.send({ status: e.response.status, data: e.response.data })
        })
})

router.post('/msg/sent', (req, res) => {
    Http.post('/chat/send', req.body)
        .then((response) => {
            console.log(response);
            res.send({ status: response.status, data: response.data })
        })
        .catch((e) => {
            res.status(e.response.status)
            res.send({ status: e.response.status, data: e.response.data })
        })
})

module.exports = router