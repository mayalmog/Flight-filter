
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


