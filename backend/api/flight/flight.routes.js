const express = require('express')
// const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
// const { log } = require('../../middlewares/logger.middleware')
const { getFlights } = require('./flight.controller')
const router = express.Router()

router.get('/', getFlights)

module.exports = router