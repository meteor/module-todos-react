import React from 'react';
import { Lists } from '../api/lists/lists.js';
import { createContainer } from '../helpers/create-container.jsx';
import ListHeader from '../components/ListHeader.jsx';
import TodoItem from '../components/TodoItem.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';

const LoadingTodos = () => (
  <div className="wrapper-message">
    <div className="title-message">Loading tasks...</div>
  </div>
);

const NoTodos = () => (
  <div className="wrapper-message">
    <div className="title-message">No tasks here</div>
    <div className="subtitle-message">Add new tasks using the field above</div>
  </div>
);

export class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editingTodo: null
    };
  }

  onEditingChange(id, editing) {
    this.setState({
      editingTodo: editing ? id : null
    });
  }

  render() {
    const { list, listExists, loading, todos } = this.props;
    const { editingTodo } = this.state;

    if (!listExists) {
      return <NotFoundPage/>;
    }

    const Todos = !todos || !todos.length
      ? <NoTodos/>
      : todos.map(todo => (
          <TodoItem
            todo={todo}
            key={todo._id}
            editing={todo._id === editingTodo}
            onEditingChange={this.onEditingChange.bind(this)}/>
        ));

    return (
      <div className="page lists-show">
        <ListHeader list={list}/>
        <div className="content-scrollable list-items">
          {loading ? <LoadingTodos/> : Todos}
        </div>
      </div>
    );
  }
}

export const ListContainer = createContainer(List, {
  getMeteorData: ({ params: { id }}) => {
    const todosHandle = Meteor.subscribe('Todos.inList', id);
    const loading = !todosHandle.ready();
    const list = Lists.findOne(id);
    const listExists = !loading && !!list;
    return {
      loading,
      list,
      listExists,
      todos: listExists && list.todos().fetch()
    };
  }
});
