import React from 'react';
import { Link } from 'react-router';

const ListList = ({ lists, createNewList }) => (
  <div className="list-todos">
    <a className="link-list-new" onClick={createNewList}>
      <span className="icon-plus"></span>
      New List
    </a>
    {lists.map(list => (
      <Link
        to={`/lists/${ list._id }`}
        key={list._id}
        title={list.name}
        className="list-todo"
        activeClassName="active">
        {list.userId
          ? <span className="icon-lock"></span>
          : null}
        {list.incompleteCount
          ? <span className="count-list">{list.incompleteCount}</span>
          : null}
        {list.name}
      </Link>
    ))}
  </div>
);

export default ListList;
