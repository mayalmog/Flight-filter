const express = require('express')
const { getFlights } = require('./flight.controller')
const router = express.Router()

router.get('/', getFlights)

module.exports = router