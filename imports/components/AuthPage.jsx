import React from 'react';
import MobileMenu from './MobileMenu.jsx';

const AuthPage = ({ content, link }) => (
  <div className="page auth">
    <nav>
      <MobileMenu/>
    </nav>
    <div className="content-scrollable">
      {content}
      {link}
    </div>
  </div>
);

export default AuthPage;
