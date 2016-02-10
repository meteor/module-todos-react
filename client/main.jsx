import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { AppContainer } from '../imports/ui/containers/App.jsx';
import { ListContainer } from '../imports/ui/containers/List.jsx';
import SignInPage from '../imports/ui/pages/SignInPage.jsx';
import JoinPage from '../imports/ui/pages/JoinPage.jsx';
import NotFoundPage from '../imports/ui/pages/NotFoundPage.jsx';

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
