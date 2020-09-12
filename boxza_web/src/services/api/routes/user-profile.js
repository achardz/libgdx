const express = require('express')
const Http = require('../../http')

const router = express()

router.get('/user-profile/profile', (req, res) => {
    Http.get('/profile/profile', { params: req.query })
        .then((response) => {
            delete response.data.data.user['password'];
            res.send({ status: response.status, data: response.data.data })
        })
        .catch((e) => {
            res.status(e.response.status)
            res.send({ status: e.response.status, data: e.response.data })
        })
})

router.get('/user-profile/storage', (req, res) => {
    Http.get('/profile/storage', { params: req.query })
        .then((response) => {
            res.send({ status: response.status, data: response.data.data })
        })
        .catch((e) => {
            res.status(e.response.status)
            res.send({ status: e.response.status, data: e.response.data })
        })
})

router.get('/user-profile/delivery', (req, res) => {
    Http.get('/profile/delivery', { params: req.query })
        .then((response) => {
            // delete response.data.data.user['password'];
            res.send({ status: response.status, data: response.data.data })
        })
        .catch((e) => {
            res.status(e.response.status)
            res.send({ status: e.response.status, data: e.response.data })
        })
})

router.get('/user-profile/reward', (req, res) => {
    Http.get('/his', { params: req.query })
        .then((response) => {
            res.send({ status: response.status, data: response.data.data })
        })
        .catch((e) => {
            res.status(e.response.status)
            res.send({ status: e.response.status, data: e.response.data })
        })
})

router.patch('/user-profile/profile', (req, res) => {
    Http.patch('/profile/profile', req.body)
        .then((response) => {
            res.send({ status: response.status, data: response.data })
        })
        .catch((e) => {
            res.status(e.response.status)
            res.send({ status: e.response.status, data: e.response.data })
        })
})

router.patch('/user-profile/upload-image', (req, res) => {
    Http.patch('/profile/upload', req.body)
        .then((response) => {
            res.send({ status: response.status, data: response.data })
        })
        .catch((e) => {
            res.status(e.response.status)
            res.send({ status: e.response.status, data: e.response.data })
        })
})

router.get('/user-profile/count-open-box', (req, res) => {
    Http.get('/profile/countopen', { params: req.query })
        .then((response) => {
            res.send({ status: response.status, data: response.data })
        })
        .catch((e) => {
            res.status(e.response.status)
            res.send({ status: e.response.status, data: e.response.data })
        })
})

router.get('/user-profile/top-up', (req, res) => {
    Http.get('/profile/topup', { params: req.query })
        .then((response) => {
            res.send({ status: response.status, data: response.data.data })
        })
        .catch((e) => {
            res.status(e.response.status)
            res.send({ status: e.response.status, data: e.response.data })
        })
})

module.exports = router
