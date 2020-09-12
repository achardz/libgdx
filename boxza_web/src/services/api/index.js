// Require API routes
const { Router } = require('express')
const bodyParser = require('body-parser')
const setHeader = require('../http/headers')
const auth = require('./routes/auth')
const general = require('./routes/general')
const dashboard = require('./routes/dashboard')
const topUp = require('./routes/topup')
const userProfile = require('./routes/user-profile')
const chat = require('./routes/chat')
const shop = require('./routes/shop')

const router = Router()

router.use(bodyParser.json({ limit: '50mb' })) // for parsing application/json
router.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 })) // for parsing application/x-www-form-urlencoded

// set header
router.use(setHeader)

// Add USERS Routes
router.use(auth)
router.use(general)
router.use(dashboard)
router.use(shop)
router.use(chat)
router.use(topUp)
router.use(userProfile)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: router
}
