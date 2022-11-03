'use strict';

const uuid = require('uuid').v4;

const PORT = process.env.PORT || 3080;


const io_server = require('socket.io')(PORT);
const airline = io_server.of('/airline');

let queue = {
    flights:{

    }
}


io_server.on('connection', (Socket)=>{
    
    Socket.on('new-flight', handleNewFlight);
    function handleNewFlight(payload){
        payload.Flight.event = 'new-flight’';
        payload.Flight.time = new Date();
        console.log(payload);

        const id = uuid();
        queue.flights[id] = payload;
        Socket.emit('flight', {id:id, payload:queue.flights[id]});
    }


    airline.on('connection', (Socket)=>{
        Socket.on('took-off', handleTookOff);
        function handleTookOff(payload){
            payload.Flight.event = 'took-off';
            payload.Flight.time = new Date();
            console.log(payload);
        }
    });

    Socket.on('flight arrived', handleFlightArrived);
    function handleFlightArrived(payload){
        payload.Flight.event = 'flight arrived';
        payload.Flight.time = new Date();
        console.log(payload);
    }


    Socket.on('get-all', ()=>{
        console.log('Get All Flight');
        Object.keys(queue.flights).forEach((id)=>{
            Socket.emit('flight', {id:id , payload:queue.flights[id].Flight, queue: queue})
        });

        Socket.on('delete', (flight)=>{
            delete queue.flights[flight.id];
        });
    })
});

