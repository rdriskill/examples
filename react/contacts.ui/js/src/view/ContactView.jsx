import React from 'react';
import ContactTable from '../component/ContactTable.jsx';
import ContactModal from '../component/ContactModal.jsx';
import ContactStore from '../store/ContactStore';
import ContactAction from '../action/ContactAction';

/*
 * Controller view for contacts that listens for store changes and updates its
 * state with those changes, propagating them to child components.
 */
export default class ContactView extends React.Component {
  constructor() {
    super();
    this.setComponentState = this.setComponentState.bind(this);
    this.onTableAdd = this.onTableAdd.bind(this);
    this.onTableEdit = this.onTableEdit.bind(this);

    this.state = {
      contacts: []
    };
  }

  componentDidMount() {
    const component = this;
    ContactAction.fetch();
    ContactStore.addOnChange(component.setComponentState);
  }

  componentWillUnmount() {
    ContactStore.removeOnChange(this.setComponentState);
  }

  onTableAdd() {
    const contactModal = this.contactModal;
    contactModal.open();
  }

  onTableEdit(contact) {
    const contactModal = this.contactModal;
    contactModal.open(contact);
  }

  setComponentState() {
    this.setState({ contacts: ContactStore.list() });
  }

  render() {
    return (
      <div>
        <ContactTable
          contacts={this.state.contacts}
          onAdd={this.onTableAdd}
          onEdit={this.onTableEdit}
        />

        <ContactModal ref={(cmp) => { this.contactModal = cmp; }} />
      </div>
    );
  }
}
