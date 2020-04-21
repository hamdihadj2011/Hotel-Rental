import { camelCase } from "camel-case";

let instance = null;
export class Cacher {
  cache = {};
  constructor() {
    if (!instance) {
      //Singeleton
      instance = this;
    }
    return instance;
  }
  isValidCached(key) {
    return this.getCachedValue(key);
  }
  cacheValue(key, value) {
    this.cache[camelCase(key)] = value;
  }

  getCachedValue(key) {
    return this.cache[camelCase(key)];
  }
}
