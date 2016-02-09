import React from 'react';
import { Link } from 'react-router';

const loggedIn = (user, open, toggle) => {
  const email = user.emails[0].address;
  const emailLocalPart = email.substring(0, email.indexOf('@'));
  return (
    <div className="btns-group-vertical">
      <a href="#" className="btn-secondary" onClick={toggle}>
        {open
          ? <span className="icon-arrow-up"></span>
          : <span className="icon-arrow-down"></span>}
        {emailLocalPart}
      </a>
      {open ? <a className="js-logout btn-secondary">Logout</a> : null}
    </div>
  );
};

const loggedOut = () => (
  <div className="btns-group">
    <Link to="/signin" className="btn-secondary">Sign In</Link>
    <Link to="/join" className="btn-secondary">Join</Link>
  </div>
);

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userMenuOpen: false
    };
  }

  render() {
    const { userMenuOpen } = this.state;
    const { user, lists } = this.props;
    const toggleUserMenu = () => this.setState({
      userMenuOpen: !userMenuOpen
    });

    return (
      <section id="menu">
        {user ? loggedIn(user, userMenuOpen, toggleUserMenu) : loggedOut()}
      </section>
    );
  }
}

Menu.propTypes = {
  user: React.propTypes.object,
  lists: React.propTypes.array
};
