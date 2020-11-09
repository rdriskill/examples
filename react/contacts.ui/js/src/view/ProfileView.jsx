import React from 'react';

export default class ProfileView extends React.Component {

  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      profile: {
        firstName: undefined,
        lastName: undefined
      }
    };
  }

  getCss() {
    const profile = this.state.profile;
    const keys = Object.keys(profile);
    const css = {
      labels: {}
    };

    keys.forEach((key) => {
      css.labels[key] = profile[key] ? 'activated' : '';
    });

    return css;
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
      <div className="card grey lighten-5">
        <div className="card-content">
          <span className="card-title">Profile</span>

          <div className="input-field">
            <input id="firstName" type="text" onChange={this.handleInputChange} />
            <label className={css.labels.firstName} htmlFor="firstName">First Name</label>
          </div>

          <div className="input-field">
            <input id="lastName" type="text" onChange={this.handleInputChange} />
            <label className={css.labels.lastName} htmlFor="lastName">Last Name</label>
          </div>

        </div>
      </div>
    );
  }
}
