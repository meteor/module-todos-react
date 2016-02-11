import React from 'react';
import { Link } from 'react-router';

export default class UserMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  toggle(e) {
    e.stopPropagation();
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    const { open } = this.state;
    const { user, logout } = this.props;

    if (user) {
      const email = user.emails[0].address;
      const emailLocalPart = email.substring(0, email.indexOf('@'));
      return (
        <div className="user-menu vertical">
          <a href="#" className="btn-secondary" onClick={this.toggle.bind(this)}>
            {open
              ? <span className="icon-arrow-up"></span>
              : <span className="icon-arrow-down"></span>}
            {emailLocalPart}
          </a>
          {open
            ? <a className="btn-secondary" onClick={logout}>Logout</a>
            : null}
        </div>
      );
    } else {
      return (
        <div className="user-menu">
          <Link to="/signin" className="btn-secondary">Sign In</Link>
          <Link to="/join" className="btn-secondary">Join</Link>
        </div>
      );
    }
  }
}
