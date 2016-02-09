import React from 'react';
import App from '../components/App.jsx';
import { Lists } from '../api/lists/lists.js';
import { createContainer } from '../helpers/create-container-with-komposer.js';

export default createContainer(App, (props, onData) => {
  const loading = !Meteor.subscribe('Lists.public').ready();
  const lists = Lists.find({$or: [
    {userId: {$exists: false}},
    {userId: Meteor.userId()}
  ]}).fetch();

  onData(null, {
    loading,
    lists
  });
});
