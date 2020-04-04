/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const Iconright = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M628.78482 510.395456l-323.135538 312.373427c-19.052938 18.416442-19.05293801 48.273447 0 66.660212 19.053961 18.416442 49.910737 18.416442 68.964698 0L732.24824 543.709189c19.052938-18.416442 19.05293801-48.273447 0-66.660212l-357.633237-345.688183c-9.525957-9.207709-22.01234-13.796214-34.497699-13.796214-12.48535899 0-24.971741 4.588505-34.466999 13.82896-19.052938 18.416442-19.052938 48.242747 0 66.660212L628.78482 510.395456z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

Iconright.defaultProps = {
  size: 18,
};

export default Iconright;
