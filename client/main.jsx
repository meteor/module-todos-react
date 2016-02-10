import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { AppContainer } from '../imports/containers/App.jsx';
import { ListContainer } from '../imports/containers/List.jsx';
import SignInPage from '../imports/pages/SignInPage.jsx';
import JoinPage from '../imports/pages/JoinPage.jsx';
import NotFoundPage from '../imports/pages/NotFoundPage.jsx';

Meteor.startup(() => {
  render((
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer}>
        <Route path="lists/:id" component={ListContainer}/>
        <Route path="signin" component={SignInPage}/>
        <Route path="join" component={JoinPage}/>
        <Route path="*" component={NotFoundPage}/>
      </Route>
    </Router>
  ), document.getElementById('app'));
});
