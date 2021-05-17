'use strict';

const listeners = {};

class Event {
  static on(name, callback) {
    if (!listeners[name]) {
      listeners[name] = [];
    }

    if (listeners[name].indexOf(callback) === -1) {
      listeners[name].push(callback);
    }
  }

  static off(name, callback) {
    if (!listeners[name]) return;
    listeners[name].splice(listeners[name].indexOf(callback), 1);
  }

  static emit(event) {
    // eslint-disable-next-line no-undef
    event = event || window.event;
    let type = event.type,
        data = event.data,
        callbacks = listeners[type];
    callbacks && callbacks.length > 0 && callbacks.forEach(cb => {
      cb(data);
    });
  }

}

/**
 * 存储媒介  localstorage
 */

class Store {
  constructor(storage, namespace) {
    this.storage = storage;
    this.np = namespace;
  }

  set(key, value, expire) {
    let oldValue = this.get(key),
        newValue = value;
    value = this.mixValueAndExpire(value, expire);
    this.storage.setItem(this.np + key, value);
    this.emit(key, {
      oldValue,
      newValue
    });
  }

  get(key) {
    let extracted = this.extractValueAndExpire(key),
        value = undefined;

    if (!extracted) {
      return value;
    }

    if (extracted.expire == null || extracted.expire >= Date.now()) {
      return extracted.value;
    } else {
      this.remove(key);
      return value;
    }
  }

  remove(key) {
    this.storage.removeItem(this.np + key);
  }

  clear() {
    this.storage.clear();
  }

  on(name, callback) {
    Event.on(name, callback);
  }

  off(name, callback) {
    Event.off(name, callback);
  }

  emit(name, data) {
    Event.emit({
      type: name,
      data
    });
  }

  mixValueAndExpire(value, expire) {
    let mixed = {
      value,
      expire: expire ? Date.now() + expire : null
    };
    return JSON.stringify(mixed);
  }

  extractValueAndExpire(key) {
    try {
      return JSON.parse(this.storage.getItem(this.np + key));
    } catch (e) {
      return undefined;
    }
  }

}

var store = null;
var options = {
  namespace: "",
  // eslint-disable-next-line no-undef
  storage: localStorage
};

class leak {
  static init(params) {
    Object.assign(options, params);
    store = new Store(options.storage, options.namespace);
  }

  static set(key, value, expire) {
    if (!store) {
      this.init({});
    }

    store.set(key, value, expire);
  }

  static get(key) {
    if (!store) {
      this.init();
    }

    return store.get(key);
  }

  static remove(key) {
    if (!store) {
      this.init();
    }

    store.remove(key);
  }

  static clear() {
    if (!store) {
      this.init();
    }

    store.clear();
  }

  static off(name, callback) {
    if (!store) {
      this.init();
    }

    store.off(name, callback);
  }

  static on(name, callback) {
    if (!store) {
      this.init();
    }

    store.on(name, callback);
  }

}

module.exports = leak;
