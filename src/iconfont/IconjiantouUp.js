/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const IconjiantouUp = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 235.52L786.92352 711.68 237.09696 711.68z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconjiantouUp.defaultProps = {
  size: 18,
};

export default IconjiantouUp;
