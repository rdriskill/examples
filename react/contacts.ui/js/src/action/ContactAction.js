import Dispatcher from '../dispatcher';
import JsonProxy from '../JsonProxy';

/*
 * Action creator for contacts.
 */
class ContactAction {

  constructor() {
    this.type = {
      SAVE: 'SAVE_CONTACT',
      UPDATE: 'UPDATE_CONTACT',
      DELETE: 'DELETE_CONTACT',
      FETCH: 'FETCH_CONTACTS',
      RECEIVE: 'RECEIVE_CONTACTS'
    };
  }

  fetch() {
    const action = this;

    Dispatcher.dispatch({
      type: action.type.FETCH
    });

    JsonProxy.get('/contacts')
            .then((response) => {
              Dispatcher.dispatch({
                type: action.type.RECEIVE,
                data: response.data
              });
            })
            .catch((response) => {
                // TODO Do we dispatch error action and let the store handle it and notify the user.
            });
  }

  save(data) {
    const action = this;

    JsonProxy.post({ url: '/contacts', data })
            .then((response) => {
              Dispatcher.dispatch({
                type: action.type.SAVE,
                data: response.data
              });
            })
            .catch((response) => {
                // TODO Do we dispatch error action and let the store handle it and notify the user.
            });
  }

  update(data) {
    const action = this;

    JsonProxy.put({ url: `/contacts/${data.id}`, data })
            .then((response) => {
              Dispatcher.dispatch({
                type: action.type.UPDATE,
                data: response.data
              });
            })
            .catch((response) => {
                // TODO Do we dispatch error action and let the store handle it and notify the user.
            });
  }

  delete(data) {
    const action = this;

    JsonProxy.delete(`/contacts/${data.id}`)
            .then(() => {
              Dispatcher.dispatch({
                type: action.type.DELETE,
                data
              });
            })
            .catch((response) => {
                // TODO Do we dispatch error action and let the store handle it and notify the user.
            });
  }
}

const contactAction = new ContactAction();

/*
 * Listens for data changes from other users and dispatch an action to notify
 * stores of the data change.
 */
JsonProxy.onDataUpdate({
  path: 'contacts',
  callback: (contacts) => {
    Dispatcher.dispatch({
      type: contactAction.type.RECEIVE,
      data: contacts
    });
  }
});

export default contactAction;
