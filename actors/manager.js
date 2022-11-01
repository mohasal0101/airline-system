 'use strict';

 const {faker} = require('@faker-js/faker');
 const events = require('../events/events');
 require('./pilot');
    require('./system');


 setInterval(()=>{
    const randomDestinations = faker.address.city();
    const randomPilots = faker.name.firstName();
    const randomID = faker.random.numeric();
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

     console.log(`Manager: flight with ID ${randomID} is ready to take-off`);
     events.emit('new-flight', Flight);
 }
    , 5000);

    events.on('arrived', (payload) => {
        console.log(`Manager: we're thankful for your service, ${payload.Flight.Details.pilot}`);
        console.log(payload);
    }
    );