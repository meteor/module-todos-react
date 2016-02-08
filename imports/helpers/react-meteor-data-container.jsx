import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';

export function ReactMeteorDataContainer(Component, getMeteorData) {
  /* eslint-disable react/prefer-es6-class */
  return React.createClass({
    displayName: 'ReactMeteorDataContainer',
    mixins: [ReactMeteorData],
    getMeteorData() {
      return getMeteorData(this.props);
    },
    render() {
      return <Component {...this.props} {...this.data}/>;
    }
  });
}
