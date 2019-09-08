const express = require('express');
const router = express.Router();
const fs = require('fs');
const Flight = require('../models/flight');
const flightDataPath = './flights.json';


let flights = undefined;

fs.readFile(flightDataPath, 'utf8', (err, fileContents) => {
    try {
        const flightData = JSON.parse(fileContents);
        flights = flightData.map(flight => Object.assign(new Flight, {...flight}));
    } catch(err) {
        console.error(err);
    }
});

const returnErrorIfFlightsNotSet = (res) => {
    if(flights == undefined) {
        res.status(500).json({ message: 'Unable to handle the request' });
    }
}

// Get single flight
router.get('/flight/:flightNo', async (req, res, next) => {
    returnErrorIfFlightsNotSet(res);

    try {
        const flight = flights.find(flight => flight.FlightNo === req.params.flightNo);

        if(flight) {
            res.status(200).json(flight);
        } else {
            res.status(404).json({ message: 'Flight not found' });
        }
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});

// Get all flights
router.get('/', async (req, res, next) => {
    returnErrorIfFlightsNotSet(res);

    try {
        const response = {
            count: flights.length,
            flights: flights
        };
        res.status(200).json(response);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});

// Get all arrivals
router.get('/arrivals', async (req, res, next) => {
    returnErrorIfFlightsNotSet(res);

    try {
        const arrivals = flights.filter(flight => flight.ArrDep === 'A');

        const response = {
            count: arrivals.length,
            flights: arrivals
        };
        res.status(200).json(response);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});

// Get all departures
router.get('/departures', async (req, res, next) => {
    returnErrorIfFlightsNotSet(res);

    try {
        const departures = flights.filter(flight => flight.ArrDep === 'D');

        const response = {
            count: departures.length,
            flights: departures
        };
        res.status(200).json(response);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;
