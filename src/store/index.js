/**
 * 存储媒介  localstorage
 */
import Event from "../event/index";
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
    if(!extracted) {
      return value;
    }
    if(extracted.expire == null || extracted.expire >= Date.now()) {
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
    }catch (e){
      return undefined;
    }
  }
}
export default Store;
