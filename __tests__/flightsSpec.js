const frisby = require('frisby');

const endpoint = 'http://localhost:3100/flights';

describe('Flights', function () {
    it('should return a status of 200 on /flights GET', () => {
        return frisby
            .get(endpoint)
            .expect('status', 200);
    });

    it('should return Not Found if endpoint does not exist', (done) => {
        return frisby
            .get(`${endpoint}/fly`)
            .expect('status', 404)
            .expect('header', 'content-type', /application\/json/)
            .then((res) => {
                expect(res.json.error.message).toMatch('Not Found');
            })
            .done(done)
    });

    it('should return Flight not found if it does not exist', (done) => {
        return frisby
            .get(`${endpoint}/flight/nope`)
            .expect('status', 404)
            .expect('header', 'content-type', /application\/json/)
            .then((res) => {
                expect(res.json.message).toMatch('Flight not found');
            })
            .done(done)
    });

    it('should return all flights on /flights GET', (done) => {
        return frisby
            .get(endpoint)
            .expect('status', 200)
            .expect('header', 'content-type', /application\/json/)
            .then((res) => {
                expect(res.json.flights.length).toBe(224);
            })
            .done(done)
    });

    it('should return a correct flight on /flights/flight/flightNo GET', (done) => {
        return frisby
            .get(`${endpoint}/flight/BA8926`)
            .expect('status', 200)
            .expect('header', 'content-type', /application\/json/)
            .then((res) => {
                expect(res.json).toStrictEqual({
                    "FlightNo": "BA8926",
                    "Date": "03\/01\/2017",
                    "Time": "12:25",
                    "ArrDep": "A",
                    "PortOfCallA": "SHANNON",
                    "Status": "LANDED 1232",
                    "OtherInfo": "NOW ON STAND",
                    "Additional": "Baggage at carousel 1",
                    "Airline": "British Airways",
                    "Image": "https:\/\/s3-eu-west-1.amazonaws.com\/ediassets\/img\/airlines\/BA.jpg",
                    "ArrHall": "International"
                });
            })
            .done(done)
    });

    it('should return all arrivals on /flights/arrivals GET', (done) => {
        return frisby
            .get(`${endpoint}/arrivals`)
            .expect('status', 200)
            .expect('header', 'content-type', /application\/json/)
            .then((res) => {
                expect(res.json.flights.length).toBe(117);
            })
            .done(done)
    });

    it('should return all departures on /flights/departures GET', (done) => {
        return frisby
            .get(`${endpoint}/departures`)
            .expect('status', 200)
            .expect('header', 'content-type', /application\/json/)
            .then((res) => {
                expect(res.json.flights.length).toBe(107);
            })
            .done(done)
    });
});
