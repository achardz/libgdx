// Require API routes
const { Router } = require('express')
const bodyParser = require('body-parser')
const setHeader = require('../http/headers')
const general = require('./routes/general')
const createReward = require('./routes/createReward')
const createRewardBox = require('./routes/createRewardBox')
const createBoxType = require('./routes/createBoxType')
const itemRates = require('./routes/itemRates')
const statusItem = require('./routes/statusItem')
const userDetail = require('./routes/userDetail')
const authen = require('./routes/authen')

const router = Router()

router.use(bodyParser.json({ limit: '50mb' })) // for parsing application/json
router.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 })) // for parsing application/x-www-form-urlencoded

// set header
router.use(setHeader)

// Add USERS Routes
router.use(authen)
router.use(general)
router.use(createBoxType)
router.use(createReward)
router.use(createRewardBox)
router.use(itemRates)
router.use(statusItem)
router.use(userDetail)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: router
}
