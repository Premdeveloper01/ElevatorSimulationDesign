import Elevator from './components/elavator.js';
import EventInstance from './communication/event.js';
import SIGNAL from './communication/event.js';

export default class Simulator {

    constructor(elevators, floors) { // params: elevators count and floors count
        if (elevators<1) {
            console.log('elevators count should be atlest 1');
            return null;
        }

        if (floors<1) {
            console.log('floors count should be atleast 1');
            return null;
        }
            
        this.elevators = elevators; // elevators count
        this.floors = floors; // floors count
        
        this.elevatorsAry = []; // all elevators
        for(let i = 0; i<this.elevators; i++) {
            this.elevatorsAry.push(new Elevator(this.floors));
        }


        this.event = new EventInstance(); // event instance
        
        // Listen the signals
        this.event.onEvent(SIGNAL.FLOOR_CHANGED, elevator => {
            console.log('Floor Changed', elevator);
        });

        this.event.onEvent(SIGNAL.DOOR_OPENED, door => {
            console.log('Door Opened', door);
        });

        this.event.onEvent(SIGNAL.DOOR_CLOSED, door => {
            console.log('Door Closed', door);
        });

        this.event.onEvent(SIGNAL.TRIP_COMPLETED, elevator => {
            console.log('Trip Completed', elevator);
        });

        this.event.onEvent(SIGNAL.MAINTENANCE_STARTED, elevator => {
            console.log('Maintenance Started', elevator);
        });

        this.event.onEvent(SIGNAL.SERVICE_RESUMED, elevator => {
            console.log('Service Resumed', elevator);
        });
    }

    getClosestElevator() { // get the closest elevator
        // need to write the actual logic to find the closest elevator

        //mock
        const index = Math.floor(Math.random() * (this.elevators));
        const elevator = this.elevatorsAry[index];

        return elevator; // return the closest elevator
    }
    
    addInQuequ(destination) { // get request from any floor, when person is requesting from lobby
        const elevator = this.getClosestElevator();
        elevator.queueDestination = destination;
    }
}