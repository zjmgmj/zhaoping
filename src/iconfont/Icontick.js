/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const Icontick = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M429.501 753.859a26.127 26.127 0 0 1-18.36-7.619L144.4 479.488a25.856 25.856 0 0 1-7.46-18.452 25.887 25.887 0 0 1 7.768-18.366 25.907 25.907 0 0 1 18.283-7.496c6.886 0 13.379 2.663 18.289 7.496l248.279 248.29 413.204-413.2a25.871 25.871 0 0 1 17.982-7.199c7.152 0 13.829 2.842 18.785 7.998a25.984 25.984 0 0 1 0 36.132L447.985 746.23a25.8 25.8 0 0 1-18.386 7.629h-0.098z"
        fill={getIconColor(color, 0, '#2C2C2C')}
      />
    </Svg>
  );
};

Icontick.defaultProps = {
  size: 18,
};

export default Icontick;
