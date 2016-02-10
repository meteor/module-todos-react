import React from 'react';

const AuthErrors = ({ messages = [] }) => (
  <div className="list-errors">
    {messages.map(msg => (
      <div className="list-item" key={msg}>{msg}</div>
    ))}
  </div>
);

export default AuthErrors;
