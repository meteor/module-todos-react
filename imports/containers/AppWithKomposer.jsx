import React from 'react';
import { Todos } from '../api/todos';
import { createContainer } from '../helpers/create-container-with-komposer.jsx';

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

export const AppContainer = createContainer(App, (props, onData) => {
  const handle = Meteor.subscribe('todos');
  onData(null, {
    loading: !handle.ready(),
    todos: Todos.find().fetch()
  });
});
