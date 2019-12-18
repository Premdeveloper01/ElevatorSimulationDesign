
import Motor from './motor.js';
import DOOR from '../constant/door.js';
import SIGNAL from '../communication/event.js';

export default class Doors {

  constructor() {
    const motor = new Motor;
    this.state = new Map();

    this.event = new EventInstance();
    
    state.set(this, {motor, status: DOOR.CLOSED});
  }

  get status() {
    return state.get(this).status;
  }

  open() {
    const door = state.get(this);
    if (door.status === DOOR.OPENED) {
        return;
    }
    door.motor.stop();

    this.event.triggerEvent(SIGNAL.DOOR_OPENED, this); // pass the door opened signal
  }

  close() {
    const door = state.get(this);
   if (door.status === DOOR.CLOSED) { 
       return;
   }
   door.motor.rotate();

   this.event.triggerEvent(SIGNAL.DOOR_CLOSED, this); // pass the door closed signal
  }

}
