const logger = require('../../services/logger.service')
const flightService = require('./flight.service')

async function getFlights(req, res) {
    try {
        const flights = await flightService.query()
        res.send(flights)
    } catch (err) {
        logger.error('Cannot get flights', err)
        res.status(500).send({ err: 'Failed to get flights' })
    }
}

module.exports = {
    getFlights,

}