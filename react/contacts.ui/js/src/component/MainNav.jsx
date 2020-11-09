import React from 'react';
import { Link } from 'react-router';

const MainNav = function () {
  return (
    <nav className="blue mainNav" role="navigation">
      <div className="nav-wrapper container"><a id="logo-container" className="brand-logo">Contacts</a>
        <ul className="right hide-on-med-and-down">
          <li><Link to="home">Home</Link></li>
          <li><Link to="profile">Profile</Link></li>
        </ul>
        <ul id="nav-mobile" className="side-nav">
          <li><Link to="home">Home</Link></li>
          <li><Link to="profile">Profile</Link></li>
        </ul>
        <a data-activates="nav-mobile" className="button-collapse"><i className="material-icons">menu</i></a>
      </div>
    </nav>
  );
};

export default MainNav;
