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
        airLine: 'Jordanian Airlines',
        destination: randomDestinations,
        pilot: randomPilots,
        flightID: randomID
        }
    }
}

const io = require('socket.io-client');
const host = `http://localhost:${process.env.PORT}/`;
const connection = io.connect(host);
connection.on('Manager', handleMa);
function handleMa(payload){
     console.log(`Manager: we’re greatly thankful for the amazing flight, ${payload}`);
}
setInterval(()=>{

    console.log(`Manager: new flight with ID ${randomID} have been scheduled`);
    Flight.Flight.Details.flightID = randomID;
    Flight.Flight.Details.pilot = randomPilots;
    Flight.Flight.Details.destination = randomDestinations;
    connection.emit('new-flight', Flight);
    setTimeout(async function() {
        console.log(`Manager: we’re greatly thankful for the amazing flight, ${randomPilots}`);

    }, 9999);

 }, 10000);