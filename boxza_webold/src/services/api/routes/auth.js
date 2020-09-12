const express = require('express')
const Http = require('../../http')

const router = express()

router.post('/register', (req, res) => {
    Http.post('/auth/register', req.body)
        .then((response) => {
            res.send({ status: response.status, data: response.data })
        })
        .catch((e) => {
            res.status(e.response.status)
            res.send({ status: e.response.status, data: e.response.data })
        })
})

router.post('/login/google', (req, res) => {
    Http.post('/auth/login/google', req.body)
        .then((response) => {
            console.log(response);
            res.send({ status: response.status, data: response.data })
        })
        .catch((e) => {
            res.status(e.response.status)
            res.send({ status: e.response.status, data: e.response.data })
        })
})

router.post('/login/facebook', (req, res) => {
    console.log(req.body);
    Http.post('/auth/login/facebook', req.body)
        .then((response) => {
            //console.log(response);
            res.send({ status: response.status, data: response.data })
        })
        .catch((e) => {
            res.status(e.response.status)
            res.send({ status: e.response.status, data: e.response.data })
        })
})

router.post('/login/twitter', (req, res) => {
    Http.post('/auth/login/twitter', req.body)
        .then((response) => {
            console.log(response);
            res.send({ status: response.status, data: response.data })
        })
        .catch((e) => {
            res.status(e.response.status)
            res.send({ status: e.response.status, data: e.response.data })
        })
})

router.post('/login', (req, res) => {
    Http.post('/auth/login', req.body)
        .then((response) => {
            res.send({ status: response.status, data: response.data })
        })
        .catch((e) => {
            res.status(e.response.status)
            res.send({ status: e.response.status, data: e.response.data })
        })
})

router.patch('/reset-password', (req, res) => {
    Http.patch('/auth/reset', req.body)
        .then((response) => {
            res.send({ status: response.status, data: response.data })
        })
        .catch((e) => {
            res.status(e.response.status)
            res.send({ status: e.response.status, data: e.response.data })
        })
})

router.post('/forgot-password', (req, res) => {
    Http.post('/auth/forgot', req.body)
        .then((response) => {
            res.send({ status: response.status, data: response.data })
        })
        .catch((e) => {
            res.status(e.response.status)
            res.send({ status: e.response.status, data: e.response.data })
        })
})
module.exports = router