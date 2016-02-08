import React from 'react';
import { Todos } from '../api/todos';
import { ReactMeteorDataContainer } from '../helpers/react-meteor-data-container.jsx';

export const App = ({ loading, todos }) => (
  <div>
    <h1>App!</h1>
    <p>{loading ? 'loading...' : ''}</p>
    <ul>
      {todos.map((todo, i) => {
        return <li key={i}>{todo.text}</li>;
      })}
    </ul>
  </div>
);

export const AppContainer = ReactMeteorDataContainer(App, () => {
  const handle = Meteor.subscribe('todos');
  return {
    loading: !handle.ready(),
    todos: Todos.find().fetch()
  };
});
