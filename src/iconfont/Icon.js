/* eslint-disable */

import React from 'react';

import Icontick from './Icontick';
import Iconedit from './Iconedit';
import Iconadd from './Iconadd';
import IconcircleAdd from './IconcircleAdd';
import Iconsearch from './Iconsearch';
import Iconback from './Iconback';
import Iconright from './Iconright';

export const Icon = ({ name, ...rest }) => {
  switch (name) {
    case 'tick':
      return <Icontick {...rest} />;
    case 'edit':
      return <Iconedit {...rest} />;
    case 'add':
      return <Iconadd {...rest} />;
    case 'circleAdd':
      return <IconcircleAdd {...rest} />;
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
