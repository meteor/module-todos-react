import React from 'react';
import classNames from 'classnames';
import { Lists } from '../api/lists/lists.js';
import { createContainer } from '../helpers/create-container.js';
import Menu from '../components/Menu.jsx';
import Loading from '../components/Loading.jsx';

const CONNECTION_ISSUE_TIMEOUT = 5000;

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      userMenuOpen: false,
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
    const { user, connected, loading, lists } = this.props;
    const containerClass = classNames({
      'menu-open': this.state.menuOpen
    });

    return (
      <div id="container" className={containerClass}>
        <Menu lists={lists} user={user}/>
      </div>
    );
  }
}

App.propTypes = {
  user: React.PropTypes.object,
  connected: React.PropTypes.bool,
  loading: React.PropTypes.bool,
  lists: React.PropTypes.array
};

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
