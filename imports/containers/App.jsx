import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Todos } from '../api/todos';
import { ReactMeteorDataContainer } from 'meteor/react-meteor-data';

export const App = ({ loading, todos }) => (
  <div>
    <h1>App!</h1>
    <p>{ loading ? 'loading...' : '' }</p>
    <ul>
      {todos.map((todo, i) => {
        return <li key={i}>{ todo.text }</li>
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
