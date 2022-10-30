"use strict";

const { faker } = require("@faker-js/faker");
const events = require("../events/event-global");

// Generating data

const Pilot = faker.name.firstName('male');
const ID = faker.random.numeric();
const Destination = faker.address.city();

const Flight = {
  event: {
    time: new Date(),
    Details: {
      airLine: "Air India",
      Destination: Destination,
      pilot: Pilot,
      flightID: ID,
    },
  },
};

events.on("Manager", handleMa);
function handleMa() {
  console.log("Manager: we’re greatly thankful for the amazing flight");
}

console.log(`Manager: new flight with ${Flight.event.Details.pilot} is ready`);

Flight.Flight.Details.flightID = ID;
Flight.Flight.Details.pilot = Pilot;
Flight.Flight.Details.Destination = Destination;

events.emit("Manager", Flight);

setTimeout(() => {
    console.log(`Manager: we're greatly thankful for the amazing flight ${Pilot} `);
}, 1000);

