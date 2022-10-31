'use strict';

const { faker } = require ('@faker-js/faker');
const events = require('../events/event-global');

const Pilots = faker.name();
const ID = faker.random.numeric();
const Destination = faker.address.country();

const Flight = {
    Flight: {
        event: '',
        time: new Date(),
        Details: {
            airLine: 'Royal Jordanian Airlines',
            Destination: Destination,
            pilot: Pilots,
            flightID: ID,
        },
    },
    
 }

console.log(`Manager: new flight with ${Flight.Flight.Details.pilot} is ready`);

console.emit('flight', Flight);

setTimeout(() => {
    console.log(`Manager: we're greatly thankful for the amazing flight ${Pilot} `);
}
, 1000);

events.emit('took-off');



