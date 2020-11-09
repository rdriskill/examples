import React from 'react';
import MainNav from '../component/MainNav.jsx';

// React router view that injects the current route in props.children.
const MainView = function (props) {
  return (
    <div>
      <MainNav />
      <div className="container">
        {props.children}
      </div>
    </div>
  );
};

MainView.propTypes = { children: React.PropTypes.node };

export default MainView;
