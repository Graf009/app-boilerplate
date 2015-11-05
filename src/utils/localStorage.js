/*
* @Author: Oleg Orlov
* @Date:   2015-09-23 12:29:19
*/

const displayError = error => {
  if (error) console.error('Failed to retrieve persisted state from storage:', error); // eslint-disable-line no-console
};

export default storage => ({
  0: storage,

  put(key, value, callback) {
    try {
      storage.setItem(key, JSON.stringify(value));
      if (callback) callback();
    } catch (error) {
      displayError(error);
    }
  },

  get(key, callback) {
    try {
      const storageItem = JSON.parse(storage.getItem(key));
      if (callback) callback(storageItem);
    } catch (error) {
      displayError(error);
    }
  },

  del(key, callback) {
    try {
      storage.removeItem(key);
      if (callback) callback();
    } catch (error) {
      displayError(error);
    }
  },
});
