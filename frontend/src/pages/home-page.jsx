import React from 'react'
// import { connect } from 'react-redux'
// import { Link, Route, BrowserRouter as Router } from 'react-router-dom'

// import { FlightPreview } from '../cmps/flight-preview'
// import { loadFlights } from '../store/flight.actions'
import { flightService } from '../services/flight.service'

export class HomePage extends React.Component {
    state = {
        clockInterval: null,
        time: '',
        showFlights: false,
        flights: []
    }

    async componentDidMount() {
        this.startClock()
        flightService.query()
        try {
            const flights = await flightService.query()
            this.setState(prevState => ({ ...prevState, flights }))

        } catch (err) {
            console.log('Could not get flights', err);
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.clockInterval)
    }

    startClock = () => {
        const clockInterval = setInterval(() => {
            const timezone = "America/New_York"
            const usaTime = new Date().toLocaleTimeString("en-US", { timeZone: timezone, hour: '2-digit', minute: '2-digit' })
            this.setState(prevState => ({ ...prevState, time: usaTime }))
        }, 1000)
        this.setState(prevState => ({ ...prevState, clockInterval }))
    }

    toggleShowFlights = () => {
        this.setState(prevState => ({ ...prevState, showFlights: !this.state.showFlights }))
    }

    render() {
        const { time, flights, showFlights } = this.state
        const today = new Date(Date.now());
        const todayFormatted = today.toISOString().substring(0, 10)
        const startTime = new Date(Date.now() + 10800000).toLocaleTimeString("en-US", { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit' })
        const endTime = new Date(Date.now() + 10800000 + 7200000).toLocaleTimeString("en-US", { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit' })
        return (
            <section className="homepage flex column">
                <h1>Current Time in JFK: {time}</h1>
                <div className="homepage-flights flex column align-center justify-center">
                    <h1>There Are</h1>
                    <button
                        className="btn"
                        onClick={this.toggleShowFlights}
                    >{flights.length}</button>
                    <h1>Flights From {startTime} Till {endTime} On {todayFormatted}</h1>
                </div>
                {!showFlights && <h3>Click on the flights count to show flight list</h3>
                }
                {showFlights && <div className="flight-preview flex column">
                    {flights.map(flight =>
                        <h2 key={flight.iata}>{flight.iata ? flight.iata : 'No IATA number'} - Departure at {flight.departure}</h2>
                    )}
                </div>}

            </section >
        )
    }
}

// function mapStateToProps(state) {
//     return {
//     }
// }

// const mapDispatchToProps = {
// }

// export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage)