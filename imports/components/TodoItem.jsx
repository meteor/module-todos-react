import React from 'react';
import classnames from 'classnames';

export default class TodoItem extends React.Component {
  render() {
    const { todo, editing, onEditingChange } = this.props;
    const todoClass = classnames({
      'list-item': true,
      checked: todo.checked,
      editing
    });

    return (
      <div className={todoClass}>
        <label className="checkbox">
          <input type="checkbox" checked={todo.checked} name="checked"/>
          <span className="checkbox-custom"></span>
        </label>
        <input type="text" value={todo.text} placeholder="Task name"/>
        <a className="delete-item" href="#">
          <span className="icon-trash"></span>
        </a>
      </div>
    );
  }
}
