
import DIRECTION from '../constant/direction.js';

export default class Motor {
  constructor() {
    this.state = new Map();

    this.state.set(this, {'rotating': false, 'direction': DIRECTION.STOP});
  }

   get status() {
    return this.state.get(this);
  }


  rotate(direction = DIRECTION.UP) {
    
    if (this.rotating) this.stop();
   
    this.state.set(this, {'rotating': true, 'direction': direction});
  }

  stop() {
    this.rotating = false;
    this.direction = DIRECTION.STOP;
    this.state.set(this, {'rotating': false, 'direction': DIRECTION.STOP});
  }
}
