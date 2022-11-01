 'use strict';

/*  const events = require('../events/events');


 events.on('took-off', handleTakeOff);
 events.on('Arrived', handleArrived);

 function handleTakeOff(payload){
     payload.Flight.time = new Date();
     console.log(`Pilot: flight with ID ${payload.Flight.Details.flightID} took-off`)
     console.log(payload);
 }

 function handleArrived(payload){
     payload.Flight.time = new Date();
     console.log(`Pilot: flight with ID ${payload.Flight.Details.flightID} has arrived`)
     console.log(payload);
 } */

 require('./manager');
    require('./system');

    const events = require('../events/events');

    events.on('new-flight', handleNewFlight);

    function handleNewFlight(payload){
        payload.Flight.time = new Date();
        console.log(`Pilot: flight with ID ${payload.Flight.Details.flightID} took-off`)
        console.log(payload);
    }

    events.on('arrived', handleArrived);

    function handleArrived(payload){
        payload.Flight.time = new Date();
        console.log(`Pilot: flight with ID ${payload.Flight.Details.flightID} has arrived`)
        console.log(payload);
    }

    