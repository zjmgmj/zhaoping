/* eslint-disable */

import React from 'react';

import Iconsearch from './Iconsearch';
import Iconback from './Iconback';
import Iconright from './Iconright';

export const Icon = ({ name, ...rest }) => {
  switch (name) {
    case 'search':
      return <Iconsearch {...rest} />;
    case 'back':
      return <Iconback {...rest} />;
    case 'right':
      return <Iconright {...rest} />;
  }

  return null;
};

export default Icon;
