/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const IconShare = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M808 896h-592c-48 0-88-41.6-88-92.8V220.8C128 169.6 168 128 216 128h353.6c17.6 0 32 14.4 32 32s-14.4 32-32 32H216c-12.8 0-24 12.8-24 28.8v580.8c0 16 11.2 28.8 24 28.8h592c12.8 0 24-12.8 24-28.8V480c0-17.6 14.4-32 32-32s32 14.4 32 32v323.2c0 51.2-40 92.8-88 92.8z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M416 704c-17.6 0-32-14.4-32-32 0-281.6 230.4-512 512-512 17.6 0 32 14.4 32 32s-14.4 32-32 32c-246.4 0-448 201.6-448 448 0 17.6-14.4 32-32 32z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <Path
        d="M784 417.6c-4.8 0-11.2-1.6-16-4.8-16-9.6-20.8-28.8-11.2-43.2l96-166.4-166.4-96c-16-9.6-20.8-28.8-11.2-43.2 9.6-16 28.8-20.8 43.2-11.2l193.6 112c16 9.6 20.8 28.8 11.2 43.2l-112 193.6c-4.8 11.2-16 16-27.2 16z"
        fill={getIconColor(color, 2, '#333333')}
      />
    </Svg>
  );
};

IconShare.defaultProps = {
  size: 18,
};

export default IconShare;