import React from 'react';
import { Lists } from '../api/lists/lists.js';
import { createContainer } from '../helpers/create-container.js';
import Loading from '../components/Loading.jsx';

export const App = ({ lists }) => (
  <div>
    <h1>App!</h1>
    <ul>
      {lists.map((list, i) => {
        return <li key={i}>{list.name}</li>;
      })}
    </ul>
  </div>
);

export const AppContainer = createContainer(App, {
  data: () => {
    const handle = Meteor.subscribe('Lists.public');
    if (handle.ready()) {
      return {
        lists: Lists.find({$or: [
          {userId: {$exists: false}},
          {userId: Meteor.userId()}
        ]}).fetch()
      };
    }
  },
  loadingComponent: Loading
});
