import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

// route components
import { AppContainer } from '../../ui/containers/App.jsx';
import { ListContainer } from '../../ui/containers/List.jsx';
import SignInPage from '../../ui/pages/SignInPage.jsx';
import JoinPage from '../../ui/pages/JoinPage.jsx';
import NotFoundPage from '../../ui/pages/NotFoundPage.jsx';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
      <Route path="lists/:id" component={ListContainer}/>
      <Route path="signin" component={SignInPage}/>
      <Route path="join" component={JoinPage}/>
      <Route path="*" component={NotFoundPage}/>
    </Route>
  </Router>
);
