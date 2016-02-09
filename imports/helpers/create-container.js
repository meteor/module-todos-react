/**
 * Helper method for easier creation of meteor data containers
 * with react-komposer.
 */

import { composeWithTracker } from 'react-komposer';

export function createContainer(Component, options = {}) {
  const {
    data,
    loadingComponent = null,
    errorComponent = null,
    pure = true
  } = options;

  if (!data) {
    throw new Error('Must provide a data function to createContainer().');
  }

  const compose = (props, onData) => onData(null, data(props));

  return composeWithTracker(
    compose,
    loadingComponent,
    errorComponent,
    { pure }
  )(Component);
}
