class EventBus extends EventTarget {
    emit(name, detail = {}) {
        this.dispatchEvent(new CustomEvent(name, { detail }));
    }
}

// Create a new instance of the event bus
export const bus = new EventBus();
