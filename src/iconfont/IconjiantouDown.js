/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const IconjiantouDown = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 788.48L237.07648 312.32 786.90304 312.32z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconjiantouDown.defaultProps = {
  size: 18,
};

export default IconjiantouDown;
