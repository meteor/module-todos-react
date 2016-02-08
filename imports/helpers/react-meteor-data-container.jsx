import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';

export function ReactMeteorDataContainer(Component, getMeteorData) {
  return React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
      return getMeteorData(this.props);
    },
    render() {
      return <Component {...this.props} {...this.data} />;
    }
  });
}
