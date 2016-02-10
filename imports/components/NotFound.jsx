import React from 'react';
import MobileMenu from './MobileMenu.jsx';

const NotFound = () => (
  <div className="page not-found">
    <nav>
      <MobileMenu/>
    </nav>
    <div className="content-scrollable">
      <div className="wrapper-message">
        <div className="title-message">Page not found</div>
      </div>
    </div>
  </div>
);

export default NotFound;
