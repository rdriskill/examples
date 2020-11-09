/* eslint react/no-unused-prop-types: [2, { skipShapeProps: true }] */

import React from 'react';
import ContactAction from '../action/ContactAction';
import Event from '../Event';

// TODO Most of this could be abstracted out into a SimpleTable.
export default class ContactTable extends React.Component {
  static componentDidUpdate() {
    Event.initTable('contactsTable');
  }

  constructor() {
    super();
    this.onAdd = this.onAdd.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
    this.getStyle = this.getStyle.bind(this);

    this.state = {
      selectedRows: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    /*
     * If the component re-renders and the contacts have changed, no table rows
     * will be checked. As a result, clear the state for 'selectedRows'.
     */
    if (nextProps.contacts) {
      this.setState({ selectedRows: {} });
    }
  }

  onAdd() {
    this.props.onAdd();
  }

  onEdit() {
    const selectedRows = this.state.selectedRows;
    const selectedRowKeys = Object.keys(selectedRows);
    const contact = selectedRows[selectedRowKeys[0]];

    this.props.onEdit(contact);
  }

  onRemove() {
    const selectedRows = Object.assign({}, this.state.selectedRows);
    const selectedRowKeys = Object.keys(selectedRows);

    if (Object.keys(selectedRows).length > 0) {
      selectedRowKeys.forEach((key) => {
        ContactAction.delete(selectedRows[key]);
        delete selectedRows[key];
      });

      this.setState({ selectedRows });
    }
  }

  onRowClick(contact, event) {
    const selectedRows = Object.assign({}, this.state.selectedRows);

    if (event.target.checked) {
      selectedRows[contact.id] = contact;
    } else {
      delete selectedRows[contact.id];
    }

    this.setState({ selectedRows });
  }

  getStyle() {
    const style = {
      cardActions: {
        float: 'right'
      },
      editBtn: {
        display: 'none'
      },
      removeBtn: {
        display: 'none'
      }
    };

    if (!this.state.selectedRows || Object.keys(this.state.selectedRows).length === 1) {
      style.editBtn = {
        display: 'initial'
      };
    }

    if (!this.state.selectedRows || Object.keys(this.state.selectedRows).length > 0) {
      style.removeBtn = {
        display: 'initial'
      };
    }

    return style;
  }

  render() {
    const component = this;
    const rows = [];
    const style = component.getStyle();

    this.props.contacts.forEach((contact, index) => {
      rows.push(
        <tr key={contact.id || Date.now() + index}>
          <td>
            <input type="checkbox" id={`${contact.id}_chbx`} onClick={event => component.onRowClick(contact, event)} className="filled-in" />
            <label htmlFor={`${contact.id}_chbx`} />
          </td>
          <td>{contact.firstName}</td>
          <td>{contact.lastName}</td>
          <td>{contact.address}</td>
        </tr>
      );
    });

    if (rows.length === 0) {
      rows.push(
        <tr key={Date.now()}>
          <td colSpan="4" className="center-align">None Defined</td>
        </tr>
      );
    }

    return (
      <div id="contactsCard" className="card grey lighten-5">
        <div className="card-content">
          <span className="card-title">Contacts</span>
          <div style={style.cardActions}>
            <a className="waves-effect btn-flat" onClick={component.onAdd}>
              <i className="material-icons">add</i>
            </a>
            <a style={style.editBtn} className="waves-effect btn-flat" onClick={component.onEdit}>
              <i className="material-icons">edit</i>
            </a>
            <a style={style.removeBtn} className="waves-effect btn-flat" onClick={component.onRemove}>
              <i className="material-icons">delete</i>
            </a>
          </div>
          <table id="contactsTable" className="bordered highlight">
            <thead>
              <tr>
                <th />
                <th data-field="firstName">First Name</th>
                <th data-field="lastName">Last Name</th>
                <th data-field="address">Address</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

ContactTable.propTypes = {
  onAdd: React.PropTypes.func.isRequired,
  onEdit: React.PropTypes.func.isRequired,
  contacts: React.PropTypes.arrayOf(React.PropTypes.shape({
    firstName: React.PropTypes.string.isRequired,
    lastName: React.PropTypes.string.isRequired,
    address: React.PropTypes.string.isRequired
  }))
};
