export default function () {
  let store = {};

  return {
    getItem(key) {
      return String(store[key] || null);
    },

    setItem(key, value) {
      console.log("setting an item with ", key);
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key) {
      delete store[key];
    },

    getAll() {
      return String(store);
    },
  };
}
