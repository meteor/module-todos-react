import React from 'react';
import { Lists } from '../api/lists/lists.js';
import { createContainer } from '../helpers/create-container.jsx';
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

  componentWillReceiveProps({ loading, children }) {
    // redirect / to a list once lists are ready
    if (!loading && !children) {
      const list = Lists.findOne();
      this.context.router.replace(`/lists/${ list._id }`);
    }
  }

  componentDidMount() {
    setTimeout(() => {
      /* eslint-disable react/no-did-mount-set-state */
      this.setState({ showConnectionIssue: true });
    }, CONNECTION_ISSUE_TIMEOUT);
  }

  toggleMenu(menuOpen = !Session.get('menuOpen')) {
    Session.set({ menuOpen });
  }

  logout() {
    Meteor.logout();

    // if we are on a private list, we'll need to go to a public one
    const list = Lists.findOne(this.props.params.id);
    if (list.userId) {
      const publicList = Lists.findOne({ userId: { $exists: false }});
      this.context.router.push(`/lists/${ publicList._id }`);
    }
  }

  render() {
    const { showConnectionIssue } = this.state;
    const { user, connected, loading, lists, menuOpen, children } = this.props;
    const closeMenu = this.toggleMenu.bind(this, false);

    return (
      <div id="container" className={menuOpen ? 'menu-open' : ''}>
        <section id="menu">
          <UserMenu user={user} logout={this.logout.bind(this)}/>
          <ListList lists={lists}/>
        </section>
        {showConnectionIssue && !connected
          ? <ConnectionNotification/>
          : null}
        <div className="content-overlay" onClick={closeMenu}></div>
        <div id="content-container">
          {loading ? <Loading/> : children}
        </div>
      </div>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.object
};

export const AppContainer = createContainer(App, {
  getMeteorData: () => {
    const publicHandle = Meteor.subscribe('Lists.public');
    const privateHandle = Meteor.subscribe('Lists.private');
    return {
      user: Meteor.user(),
      loading: !(publicHandle.ready() && privateHandle.ready()),
      connected: Meteor.status().connected,
      menuOpen: Session.get('menuOpen'),
      lists: Lists.find({$or: [
        {userId: {$exists: false}},
        {userId: Meteor.userId()}
      ]}).fetch()
    };
  }
});
