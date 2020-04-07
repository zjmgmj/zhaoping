/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const IconcircleAdd = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M661.333333 490.666667h-128v-128a21.333333 21.333333 0 0 0-42.666666 0v128h-128a21.333333 21.333333 0 0 0 0 42.666666h128v128a21.333333 21.333333 0 0 0 42.666666 0v-128h128a21.333333 21.333333 0 0 0 0-42.666666z"
        fill={getIconColor(color, 0, '#646464')}
      />
      <Path
        d="M512 85.333333a426.666667 426.666667 0 1 0 426.666667 426.666667A427.157333 427.157333 0 0 0 512 85.333333z m0 810.666667a384 384 0 1 1 384-384 384.426667 384.426667 0 0 1-384 384z"
        fill={getIconColor(color, 1, '#646464')}
      />
    </Svg>
  );
};

IconcircleAdd.defaultProps = {
  size: 18,
};

export default IconcircleAdd;
