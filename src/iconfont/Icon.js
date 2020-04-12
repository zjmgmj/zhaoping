/* eslint-disable */

import React from 'react';

import IconjiantouUp from './IconjiantouUp';
import IconjiantouDown from './IconjiantouDown';
import IconShare from './IconShare';
import Icontick from './Icontick';
import Iconedit from './Iconedit';
import Iconadd from './Iconadd';
import IconcircleAdd from './IconcircleAdd';
import Iconsearch from './Iconsearch';
import Iconback from './Iconback';
import Iconright from './Iconright';

export const Icon = ({ name, ...rest }) => {
  switch (name) {
    case 'jiantouUp':
      return <IconjiantouUp {...rest} />;
    case 'jiantouDown':
      return <IconjiantouDown {...rest} />;
    case 'Share':
      return <IconShare {...rest} />;
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
