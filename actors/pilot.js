'use strict';

const { faker } = require('@faker-js/faker');

const randomPilots = faker.name.firstName();
const randomID = faker.random.numeric();
const randomDestinations  = faker.address.country();

const Flight = {
    Flight : {
     event: '',
        time: new Date(),
        Details: {
        airLine: 'London Heathrow Airport',
        destination: randomDestinations,
        pilot: randomPilots,
        flightID: randomID
        }
    }
}

const io = require('socket.io-client');
const host = `http://localhost:${process.env.PORT}`;
const connection = io.connect(host);
const connectionAirline = io.connect(`${host}/airline`)

setInterval(()=>{
    setTimeout(async function() {
        console.log(`Pilot: flight with ID ${Flight.Flight.Details.flightID} has arrived`);
        connection.emit('flight arrived', Flight);
    }, 7000);
    setTimeout(async function() {
        console.log(`Pilot: flight with ID ${Flight.Flight.Details.flightID} took-off`);
        connectionAirline.emit('took-off', Flight);
    }, 4000);

    connection.emit('get-all')
    connection.on('flight', (flight)=>{
        flight.queue.flights[flight.id] = flight.payload
        console.log(flight.queue);

        connection.emit('delete', flight);
    })
}, 10000);
