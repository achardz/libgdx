const express = require('express')
const Http = require('../../http')

const router = express()

router.get('/shop/items', (req, res) => {
    Http.get('/v1/items', req.body)
        .then((response) => {
            res.send({ status: response.status, data: response.data })
        })
        .catch((e) => {
            res.status(e.response.status)
            res.send({ status: e.response.status, data: e.response.data })
        })
})

module.exports = router
