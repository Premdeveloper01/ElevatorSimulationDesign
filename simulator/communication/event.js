export default class EventInstance { // Singleton Class for communication
    constructor() {
        if (Event.instance)
            return EventInstance.instance;
        
        this.eventTarget = new EventTarget();
        EventInstance.instance = this;
    }

    onEvent(type, callback) {
        this.eventTarget.addEventListener(type, (e) => {
            callback(e);
        });
    }

    triggerEvent (type, data) {
        const event = new CustomEvent(type, {"detail": data});
        this.eventTarget.dispatchEvent(event);
    }
}
EventInstance.instance = null; // Static data member