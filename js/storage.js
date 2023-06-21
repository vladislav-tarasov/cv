export const localStorageKeys = {
  theme: "theme",
  lang: "lang",
};

export const storageNames = {
  local: "localStorage",
};

class StorageAdapter {
  constructor(storageName) {
    this.storageName = storageName;
    this.storage = window[storageName];
  }

  static keys = {
    [storageNames.local]: localStorageKeys,
  };

  validateKey(key) {
    if (typeof key !== "string") {
      throw "the key should be a string";
    }

    if (!StorageAdapter.keys[this.storageName]?.[key]) {
      throw "the key is not defined";
    }
  }

  get(key) {
    try {
      this.validateKey(key);

      const storageValue = this.storage.getItem(key);
      return storageValue ? JSON.parse(storageValue).value : null;
    } catch (err) {
      console.error(err);
    }
  }

  set(key, value) {
    try {
      this.validateKey(key);

      const stringifiedValue = JSON.stringify({ value });
      this.storage.setItem(key, stringifiedValue);
    } catch (err) {
      console.error(err);
    }
  }

  remove(key) {
    try {
      this.validateKey(key);

      this.storage.removeItem(key);
    } catch (err) {
      console.error(err);
    }
  }

  addStorageEvent(key, callback) {
    try {
      this.validateKey(key);

      window.addEventListener("storage", (e) => {
        if (e.key === key) {
          const nextValue = JSON.parse(e.newValue);
          callback(nextValue, e);
        }
      });
    } catch (err) {
      console.error(err);
    }
  }
}

const localStorage = new StorageAdapter(storageNames.local);

export { localStorage };
