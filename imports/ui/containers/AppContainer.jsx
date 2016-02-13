import { Lists } from '../../api/lists/lists.js';
import { createContainer } from '../helpers/create-container.jsx';
import App from '../layouts/App.jsx';

export default createContainer(() => {
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
}, App);
