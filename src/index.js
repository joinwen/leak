import Store from "./store/index";
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
    if(!store) {
      this.init({});
    }
    store.set(key, value, expire);
  }
  static get(key) {
    if(!store) {
      this.init();
    }
    return store.get(key);
  }
  static remove(key) {
    if(!store) {
      this.init();
    }
    store.remove(key);
  }
  static clear() {
    if(!store) {
      this.init();
    }
    store.clear();
  }
  static off(name, callback) {
    if(!store) {
      this.init();
    }
    store.off(name, callback);
  }
  static on(name, callback) {
    if(!store) {
      this.init();
    }
    store.on(name, callback);
  }
}
export default leak;
