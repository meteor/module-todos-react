export const Todos = new Mongo.Collection('todos');

if (Meteor.isClient) {
  Meteor.subscribe('todos');
} else {
  Meteor.publish('todos');
}
