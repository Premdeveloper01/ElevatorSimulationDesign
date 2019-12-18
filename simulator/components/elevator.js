
import Motor from './motor.js';
import DIRECTION from '../constant/direction.js';
import MODE from '../constant/mode.js';
import Door from '../constant/door.js';
import EventInstance from '../communication/event.js';
import SIGNAL from '../constant/signal.js';
import Trip from './trip.js';

export default class Elevator {

  constructor(floors) {
    this.state = new Set();
    this.queue = new Array();
    this.trips = new Array();

    const motor = new Motor();
    const door = new Door();

    this.event = new EventInstance();

    this.state.set(this, { motor, door, level: 0, status: MODE.ACTIVE, floors });
  }

  get level() {
    return this.state.get(this).level;
  }

  get status() {
    return this.state.get(this).status;
  }

  get floors() {
    return this.state.get(this).floors;
  }

  queueDestination(level) { // when person is requesting from inside the elevator
    if (level < 0 || level >= this.floors) { //  check if requested for invalid floor
      console.log('Invalid Floor Request');
      return;
    }

    if (!this.queue.includes(level)) {
      destinationQueue.push(level);
    }
  }

  moveNext() {
    if (this.queue.isEmpty()) {
      return;
    }
    const destination = this.queue.pop();
    if (this.level < destination) {
      move(destination);
    } else if (this.level > destination) {
      move(destination);
    }

    if (this.level == destination) {
      this.door.open();
    }
  }

  isInPath(level) {
    if (this.queue.isEmpty()) {
      return false;
    }
    const destination = this.queue.pop();
    return (level >= this.level && level <= destination) || (level <= this.level && level >= destination);
  }

  move(level) {
    const elevator = this.state.get(this);
    const rotation = level > elevator.level ? DIRECTION.UP : DIRECTION.DOWN;
    const source = elevator.level;
    elevator.level = level;
    elevator.motor.rotate(rotation);
    //mock

    const interval = setInterval(() => {
      this.event.triggerEvent(SIGNAL.FLOOR_CHANGED, this); // pass the floor changed signal

      elevator += elevator.level
    }, 1000);
    const dupQue = [...this.queue];
    if(this.isInPath(dupQue.pop())) {
      clearInterval(interval);
      reach(source, elevator.level);
    }
  }

  reach(source, destination) {
    const elevator = this.state.get(this);

    this.trips.push(new Trip(source, destination));
    this.event.triggerEvent(SIGNAL.TRIP_COMPLETED, this); // pass the trip completed signal

    if (this.trips.length < 100) {
      elevator.motor.rotate(DIRECTION.STOP);
      elevator.door.open();
      setTimeout( _ => elevator.door.close, 1000);
      this.moveNext();
    } else {
      startMaintenance();
    }
  }

  startMaintenance() { // put the elevator in maintenance mode
    const elevator = this.state.get(this);
    elevator.status = MODE.MAINTENCE;

    this.event.triggerEvent(SIGNAL.MAINTENANCE_STARTED, this); // pass the maintenance started signal
  }

  resumeService() { // remove maintenance mode and result the service
    const elevator = this.state.get(this);
    elevator.status = MODE.ACTIVE;
    this.trips = new Array(); // clear the trips

    this.event.triggerEvent(SIGNAL.SERVICE_RESUMED, this); // pass the service resume signal
  }
}
