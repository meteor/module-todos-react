import React from 'react';
import { Link } from 'react-router';

export default class UserMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  render() {
    const { open } = this.state;
    const { user, logout } = this.props;

    const toggle = () => this.setState({
      open: !open
    });

    if (user) {
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
          {open
            ? <a className="btn-secondary" onClick={logout}>Logout</a>
            : null}
        </div>
      );
    } else {
      return (
        <div className="btns-group">
          <Link to="/signin" className="btn-secondary">Sign In</Link>
          <Link to="/join" className="btn-secondary">Join</Link>
        </div>
      );
    }
  }
}
