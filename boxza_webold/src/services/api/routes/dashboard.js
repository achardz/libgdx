const express = require('express')
const Http = require('../../http')

const router = express()
    // tab-menu
router.get('/dashboard/categories', (req, res) => {
        Http.get('/v1/categories/all')
            .then((response) => {
                res.send({ status: response.status, data: response.data.data })
            })
            .catch((e) => {
                res.status(e.response.status)
                res.send({ status: e.response.status, data: e.response.data })
            })
    })
    // ประเภทกล่อง by id
router.get('/dashboard/box', (req, res) => {
    Http.get('/list/box', { params: req.query })
        .then((response) => {
            res.send({ status: response.status, data: response.data.data })
        })
        .catch((e) => {
            res.status(e.response.status)
            res.send({ status: e.response.status, data: e.response.data })
        })
})

router.post('/dashboard/buy/box', (req, res) => {
    Http.post('/v1/buy/box', req.body)
        .then((response) => {
            // res.send({ status: response.status, data: response.data })
            Http.get('/v1/random', { params: req.body })
                .then((resp) => {
                    res.send({ status: resp.status, data: resp.data.data, gold: response.data.gold })
                })
                .catch((e) => {
                    res.status(e.response.status)
                    res.send({ status: e.resp.status, data: e.resp.data })
                })
        })
        .catch((e) => {
            // res.status(e.response.status)
            res.send({ status: e.response.status, data: e.response.data })
        })
})

// check buy box
router.get('/dashboard/check-buy/box', (req, res) => {
    Http.get('/v1/buy/boxstatus', { params: req.query })
        .then((response) => {
            res.send({ status: response.status, data: response.data })
        })
        .catch((e) => {
            res.status(e.response.status)
            res.send({ status: e.response.status, data: e.response.data })
        })
})

// random box
// router.get('/dashboard/random/item', (req, res) => {
//     Http.get('/v1/random', { params: req.query })
//         .then((response) => {
//             res.send({ status: response.status, data: response.data.data })
//         })
//         .catch((e) => {
//             res.status(e.response.status)
//             res.send({ status: e.response.status, data: e.response.data })
//         })
// })

// check random box
router.get('/dashboard/check-random/item', (req, res) => {
    Http.get('/check/box', { params: req.query })
        .then((response) => {
            res.send({ status: response.status, data: response.data })
        })
        .catch((e) => {
            res.status(e.response.status)
            res.send({ status: e.response.status, data: e.response.data })
        })
})

// buy item
router.post('/dashboard/buy-item', (req, res) => {
    Http.post('/v1/buy/item', req.body)
        .then((response) => {
            res.send({ status: response.status, data: response.data })
        })
        .catch((e) => {
            res.status(e.response.status)
            res.send({ status: e.response.status, data: e.response.data })
        })
})

// get item by id
router.get('/dashboard/item-store/item', (req, res) => {
    Http.get('/list/item', { params: req.query })
        .then((response) => {
            res.send({ status: response.status, data: response.data.data })
        })
        .catch((e) => {
            res.status(e.response.status)
            res.send({ status: e.response.status, data: e.response.data })
        })
})

module.exports = router