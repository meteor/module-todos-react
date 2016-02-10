import React from 'react';
import classnames from 'classnames';

import {
  setCheckedStatus,
  updateText,
  remove,
} from '../api/todos/methods.js';

export default class TodoItem extends React.Component {
  setTodoCheckStatus(event) {
    setCheckedStatus.call({
      todoId: this.props.todo._id,
      newCheckedStatus: event.target.checked
    })
  }

  updateTodo(event) {
    updateText.call({
      todoId: this.props.todo._id,
      newText: event.target.value
    }, (err) => {
      err && alert(err.error);
    });
  }

  deleteTodo() {
    remove.call({
      todoId: this.props.todo._id
    }, (err) => {
      err && alert(err.error); // translate this string after #59
    });
  }

  onFocus() {
    this.props.onEditingChange(this.props.todo._id, true);
  }

  onBlur() {
    this.props.onEditingChange(this.props.todo._id, false);
  }

  render() {
    const { todo, editing } = this.props;
    const todoClass = classnames({
      'list-item': true,
      checked: todo.checked,
      editing
    });

    return (
      <div className={todoClass}>
        <label className="checkbox">
          <input
            type="checkbox"
            checked={todo.checked}
            name="checked"
            onChange={this.setTodoCheckStatus.bind(this)}/>
          <span className="checkbox-custom"></span>
        </label>
        <input
          type="text"
          value={todo.text}
          placeholder="Task name"
          onFocus={this.onFocus.bind(this)}
          onBlur={this.onBlur.bind(this)}
          onChange={this.onBlur.bind(this)}
          onInput={this.updateTodo.bind(this)}/>
        <a
          className="delete-item"
          href="#"
          onClick={this.deleteTodo.bind(this)}
          onMouseDown={this.deleteTodo.bind(this)}>
          <span className="icon-trash"></span>
        </a>
      </div>
    );
  }
}
