const listeners = {};
class Event {
  static on(name, callback) {
    if(!listeners[name]) {
      listeners[name] = [];
    }
    if(listeners[name].indexOf(callback) === -1) {
      listeners[name].push(callback);
    }
  }
  static off(name, callback) {
    if(!listeners[name])
      return;
    listeners[name].splice(listeners[name].indexOf(callback),1);
  }
  static emit(event) {
    // eslint-disable-next-line no-undef
    event = event || window.event;
    let type = event.type,
      data = event.data,
      callbacks = listeners[type];
    callbacks && callbacks.length >0 && callbacks.forEach(cb => {
      cb(data);
    });
  }
}
export default Event;
