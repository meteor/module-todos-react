/**
 * A higher-order-component for loading meteor data using react-komposer.
 */

import React from 'react';
import { composeWithTracker } from 'react-komposer';

export function createContainer(
  Component,
  composerFn,
  options = { pure: true }
) {
  return composeWithTracker(composerFn, null, null, options)(Component);
}
