import React from 'react';
import classNames from 'classnames';
import { Lists } from '../api/lists/lists.js';
import { createContainer } from '../helpers/create-container.js';
import UserMenu from '../components/UserMenu.jsx';
import ListList from '../components/ListList.jsx';
import ConnectionNotification from '../components/ConnectionNotification.jsx';
import Loading from '../components/Loading.jsx';

const CONNECTION_ISSUE_TIMEOUT = 5000;

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      showConnectionIssue: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      /* eslint-disable react/no-did-mount-set-state */
      this.setState({ showConnectionIssue: true });
    }, CONNECTION_ISSUE_TIMEOUT);
  }

  render() {
    const { menuOpen, showConnectionIssue } = this.state;
    const { user, connected, loading, lists, children } = this.props;

    const containerClass = classNames({
      'menu-open': menuOpen
    });

    const toggleMenu = () => this.setState({
      menuOpen: !menuOpen
    });

    return (
      <div id="container" className={containerClass}>
        <section id="menu">
          <UserMenu user={user}/>
          <ListList lists={lists}/>
        </section>
        {showConnectionIssue && !connected
          ? <ConnectionNotification/>
          : null}
        <div className="content-overlay" onClick={toggleMenu}></div>
        <div id="content-container">
          {loading ? <Loading/> : children}
        </div>
      </div>
    );
  }
}

export const AppContainer = createContainer(App, {
  getMeteorData: () => {
    const publicHandle = Meteor.subscribe('Lists.public');
    const privateHandle = Meteor.subscribe('Lists.private');
    return {
      user: Meteor.user(),
      loading: !(publicHandle.ready() && privateHandle.ready()),
      connected: Meteor.status().connected,
      lists: Lists.find({$or: [
        {userId: {$exists: false}},
        {userId: Meteor.userId()}
      ]}).fetch()
    };
  }
});
