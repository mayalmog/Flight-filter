const logger = require('../../services/logger.service')
const flightService = require('./flight.service')
// const userService = require('../user/user.service')
// const socketService = require('../../services/socket.service')

async function getFlights(req, res) {
    try {
        const flights = await flightService.query()
        // console.log('flights from controller: ', flights);
        res.send(flights)
    } catch (err) {
        logger.error('Cannot get flights', err)
        res.status(500).send({ err: 'Failed to get flights' })
    }
}

module.exports = {
    getFlights,

}