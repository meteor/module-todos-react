import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { AppContainer } from '../../imports/containers/App.jsx';
import NotFound from '../../imports/components/NotFound.jsx';

Meteor.startup(() => {
  render((
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer}>
        <Route path="lists/:id" component={({ params }) => <div>{params.id}</div>}/>
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  ), document.getElementById('app'));
});
