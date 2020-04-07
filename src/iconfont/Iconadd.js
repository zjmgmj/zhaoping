/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const Iconadd = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M881 483H541V142c0-16.5-13.3-30-29.5-30S482 125.5 482 142v341H141c-16.5 0-30 13.3-30 29.5s13.5 29.5 30 29.5h341v340c0 16.5 13.3 30 29.5 30s29.5-13.5 29.5-30V542h340c16.5 0 30-13.3 30-29.5S897.5 483 881 483z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

Iconadd.defaultProps = {
  size: 18,
};

export default Iconadd;
