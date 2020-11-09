import Axios from 'axios';
import Firebase from 'firebase';

/**
 * Serves as an abstraction layer for XHR and other API's for JSON retrieval
 * and injection point for server authentication if needed.
 */

const serverBaseUrl = 'https://blazing-fire-8874.firebaseio.com';
const urlExtension = '.json';

export default class JsonProxy {

    /**
     * Requests a list of json data from the specifed url.
     * @param {String} url
     */
  static get(url) {
    return new Promise((resolve, reject) => {
      Axios.get(serverBaseUrl + url + urlExtension)
                .then((response) => {
                  const list = [];
                  const result = response;

                  Object.keys(result.data).forEach((key) => {
                    result.data[key].id = key;
                    list.push(result.data[key]);
                  });

                  result.data = list;
                  resolve(result);
                })
                .catch((response) => {
                  reject(response);
                });
    });
  }

    /**
     * Posts data to the url.
     * @param {Object} options
     * @param {String} options.url
     * @param {Object} options.data
     */
  static post(options) {
    return new Promise((resolve, reject) => {
      Axios.post(serverBaseUrl + options.url + urlExtension, options.data)
                .then((response) => {
                  const result = response;
                  const data = options.data;

                  data.id = result.data.name;
                  result.data = data;
                  resolve(result);
                })
                .catch((response) => {
                  reject(response);
                });
    });
  }

    /**
     * Puts data to the url.
     * @param {Object} options
     * @param {String} options.url
     * @param {Object} options.data
     */
  static put(options) {
    /*
     * Using jQuery to create a duplicate instance of the data object.
     * Function should not alter the arguments passed in since other code could
     * be relying upon it.
     */
    const data = $.extend({}, options.data);
    const dataId = data.id;

    // Deleting id since Firebase doesn't store it with the core data.
    delete data.id;

    return new Promise((resolve, reject) => {
      Axios.put(serverBaseUrl + options.url + urlExtension, data)
                .then((response) => {
                  const result = response;
                  result.data.id = dataId;
                  resolve(result);
                })
                .catch((response) => {
                  reject(response);
                });
    });
  }

    /**
     * Deletes data with the url.
     * @param {Object} options
     * @param {String} options.url
     * @param {Object} options.data
     */
  static delete(url) {
    return Axios.delete(serverBaseUrl + url + urlExtension);
  }

  /**
   * Invokes the specified callback when real time changes are received.
   * @param {Object} options
   * @param {String} options.path
   * @param {Function} options.callback(data)
   */
  static onDataUpdate(options) {
    // See Firebase docs at https://firebase.google.com/docs/web/setup

    // TODO Invoking this method more than once may create multiple web sockets.
    Firebase.initializeApp({
      databaseURL: serverBaseUrl
    });

    const database = Firebase.database();
    const contactsRef = database.ref(options.path);

    contactsRef.on('value', (snapshot) => {
      const data = snapshot.val();
      const list = [];

      Object.keys(data).forEach((key) => {
        data[key].id = key;
        list.push(data[key]);
      });

      options.callback(list);
    });
  }
}
