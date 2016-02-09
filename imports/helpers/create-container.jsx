/**
 * A simple higher-order-component using the ReactMeteorData mixin from
 * react-meteor-data.
 */

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

export function createContainer(
  Component,
  getMeteorData,
  options = { pure: true }
) {
  const mixins = [ReactMeteorData];
  if (!options.pure) {
    mixins.push(PureRenderMixin);
  }
  /* eslint-disable react/prefer-es6-class */
  return React.createClass({
    displayName: 'ReactMeteorDataContainer',
    mixins,
    getMeteorData() {
      return getMeteorData(this.props);
    },
    render() {
      return <Component {...this.props} {...this.data}/>;
    }
  });
}
