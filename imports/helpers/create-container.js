/**
 * Helper method for easier creation of meteor data containers
 * with react-komposer.
 */

import { composeWithTracker } from 'react-komposer';

export function createContainer(
  Component,
  composerFn,
  options = { pure: true }
) {
  return composeWithTracker(composerFn, null, null, options)(Component);
}
