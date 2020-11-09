import EventEmitter from 'events';
import Dispatcher from '../dispatcher';
import ContactAction from '../action/ContactAction';

// TODO Most of this store could be abstracted out into a BaseStore.
class ContactStore extends EventEmitter {
  constructor() {
    super();
    this.CHANGE_EVENT = 'change';
    this.data = [];
  }

  /**
   * Add a callback to perform operations when the data in the
   * store changes.
   * @param {Function} callback - function to invoke when data changes.
   */
  addOnChange(callback) {
    this.on(this.CHANGE_EVENT, callback);
  }

  /**
   * Removes a previously registered store data change callback.
   * @param {Function} callback - function to invoke when data changes.
   */
  removeOnChange(callback) {
    this.removeListener(this.CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(this.CHANGE_EVENT);
  }

  list() {
    // TODO Return deep copy of array to prevent mutation of the store's data.
    return this.data;
  }
}

/*
 * Methods that save, update, or delete data should not be accessible on the store.
 * They should only be invoked indirectly through dispatching actions.
 */
const contactStore = new ContactStore();

Dispatcher.register((action) => {
  /*
   * Since the app receives real time updates, the store does not have to handle
   * save, update, or delete actions. These data changes will be received just the same
   * as changes from other users.
   */

  if (action.type === ContactAction.type.RECEIVE) {
    contactStore.data = action.data;
    contactStore.emitChange();
  }
});

export default contactStore;
