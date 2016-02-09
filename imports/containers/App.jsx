import React from 'react';
import { Lists } from '../api/lists/lists.js';
import { createContainer } from '../helpers/create-container.js';

export const App = ({ loading, lists }) => (
  <div>
    <h1>App!</h1>
    <p>{loading ? 'loading...' : ''}</p>
    <ul>
      {lists.map((list, i) => {
        return <li key={i}>{list.name}</li>;
      })}
    </ul>
  </div>
);

export const AppContainer = createContainer(App, (props, onData) => {
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
