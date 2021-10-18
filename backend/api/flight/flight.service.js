
const axios = require('axios').default;

const BASE_URL = `http://api.aviationstack.com/v1/flights?access_key=ac92ca0ff9774f4a259828fa77ff44c7&dep_iata=JFK&flight_status=scheduled`

async function query() {
    try {

        var flights = await axios.get(BASE_URL)
        const startTime = Date.now()
        let filteredFlights;
        filteredFlights = flights.data.data.filter(flight =>
            (new Date(flight.departure.scheduled).getTime() > (startTime))
            && (new Date(flight.departure.scheduled).getTime() < (startTime + (7200000))))
        // (new Date(flight.departure.scheduled).getTime() > (startTime + 10800000))// In 3 hours- usually does not return any flights.
        // && (new Date(flight.departure.scheduled).getTime() < (startTime + (10800000 + 7200000))))//Until 5 hours from now.usually does not return any flights.

        //FOR DEBUGGING:
        // let sortedFlights = flights.data.data.map(flight => (Date.parse(new Date(flight.departure.scheduled)))).sort((a, b) => a - b)
        // sortedFlights = sortedFlights.map(flightTimestamp => new Date(flightTimestamp).toLocaleString("en-US", { timeZone: 'America/New_York' }))
        // console.log('sorted flights: ', sortedFlights);

        filteredFlights = filteredFlights.map(flight =>
        ({
            iata: flight.flight.iata,
            departure: new Date(flight.departure.scheduled).toLocaleTimeString("en-US", { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit' }
            )
        }))

        console.log(filteredFlights);
        return filteredFlights
    } catch (err) {
        logger.error('cannot find flights', err)
        throw err
    }
}


module.exports = {
    query,

}


