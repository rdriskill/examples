import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import ContactView from './view/ContactView.jsx';
import ProfileView from './view/ProfileView.jsx';
import NotFoundView from './view/NotFoundView.jsx';
import MainView from './view/MainView.jsx';
import Event from './Event';

$(document).ready(() => {
  ReactDOM.render(
    <Router history={hashHistory}>
      <Route path="/" component={MainView}>
        <IndexRoute component={ContactView} />
        <Route path="home" component={ContactView} />
        <Route path="profile" component={ProfileView} />
        <Route path="*" component={NotFoundView} />
      </Route>
    </Router>,
    document.getElementById('app-container')
  );

  Event.initSideNav();
});
