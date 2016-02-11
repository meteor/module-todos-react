import React from 'react';

const Message = ({ title, subtitle }) => (
  <div className="wrapper-message">
    {title ? <div className="title-message">{title}</div> : null}
    {subtitle ? <div className="subtitle-message">{subtitle}</div> : null}
  </div>
);

export default Message;
