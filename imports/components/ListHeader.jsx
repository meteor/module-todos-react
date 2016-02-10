import React from 'react';
import MobileMenu from './MobileMenu.jsx';

export default class ListHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
  }

  render() {
    const { list } = this.props;
    const { editing } = this.state;
    let header
    if (editing) {
      header = (
        <form className="list-edit-form">
          <input type="text" name="name" value={list.name}/>
          <div className="nav-group right">
            <a href="#" className="nav-item">
              <span className="icon-close" title="Cancel"></span>
            </a>
          </div>
        </form>
      );
    } else {
      header = (
        <div>
          <MobileMenu/>
          <h1 className="title-page">
            <span className="title-wrapper">{list.name}</span>
            <span className="count-list">{list.incompleteCount}</span>
          </h1>
          <div className="nav-group right">
            <div className="nav-item options-mobile">
              <select className="list-edit" defaultValue="default">
                <option disabled value="default">Select an action</option>
                {list.userId
                  ? <option value="public">Make Public</option>
                  : <option value="private">Make Private</option>}
                <option value="delete">Delete</option>
              </select>
              <span className="icon-cog"></span>
            </div>
            <div className="options-web">
              <a className="js-toggle-list-privacy nav-item">
                {list.userId
                  ? <span className="icon-lock" title="Make list public"></span>
                  : <span className="icon-unlock" title="Make list private"></span>}
              </a>
              <a className="js-delete-list nav-item">
                <span className="icon-trash" title="Delete list"></span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return (
      <nav>
        {header}
        <form className="todo-new input-symbol">
          <input type="text" placeholder="Type to add new tasks"/>
          <span className="icon-add"></span>
        </form>
      </nav>
    );
  }
}
