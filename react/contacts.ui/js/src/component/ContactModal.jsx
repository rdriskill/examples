import React from 'react';
import ContactAction from '../action/ContactAction';

/*
 * TODO Add attributes company,jobTitle,email,phone,birthday,notes.
 */
export default class ContactModal extends React.Component {
  static close() {
    $('div#contactsModal').closeModal();
  }

  static getDefaultState() {
    return {
      contact: {
        firstName: '',
        lastName: '',
        address: ''
      }
    };
  }

  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.open = this.open.bind(this);
    this.state = ContactModal.getDefaultState();
  }

  getCss() {
    const contact = this.state.contact;
    const keys = Object.keys(contact);
    const css = {
      labels: {}
    };

    keys.forEach((key) => {
      css.labels[key] = contact[key] ? 'activated' : '';
    });

    return css;
  }

  open(contact) {
    const contactState = contact ? Object.assign({}, contact) : ContactModal.getDefaultState().contact;
    console.log(contactState);
    this.setState({ contact: contactState });
    $('div#contactsModal').openModal();
  }

  handleSave() {
    if (!this.state.contact.id) {
      ContactAction.save(this.state.contact);
    } else {
      ContactAction.update(this.state.contact);
    }

    ContactModal.close();
  }

  handleInputChange(event) {
    const contact = Object.assign({}, this.state.contact);

    if (event.target.type === 'checkbox' || event.target.type === 'radio') {
      contact[event.target.id] = event.target.checked;
    } else {
      contact[event.target.id] = event.target.value;
    }

    this.setState({ contact });
  }

  render() {
    const css = this.getCss();

    return (
      <div id="contactsModal" className="modal">
        <div className="modal-content">
          <h4>Contact</h4>
          <form>
            <div className="row">
              <div className="input-field col s6">
                <input id="firstName" type="text" value={this.state.contact.firstName} onChange={this.handleInputChange} required="" />
                <label htmlFor="firstName" className={css.labels.firstName}>First Name:</label>
              </div>
              <div className="input-field col s6">
                <input id="lastName" type="text" value={this.state.contact.lastName} onChange={this.handleInputChange} />
                <label htmlFor="lastName" className={css.labels.lastName}>Last Name:</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="address" type="text" value={this.state.contact.address} onChange={this.handleInputChange} />
                <label htmlFor="address" className={css.labels.address}>Address:</label>
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button className="blue-text text-darken-2 modal-action waves-effect waves-grey btn-flat" onClick={ContactModal.close}>Cancel</button>
          <button className="blue-text text-darken-2 modal-action waves-effect waves-grey btn-flat" onClick={this.handleSave}>Save</button>
        </div>
      </div>
    );
  }
}
