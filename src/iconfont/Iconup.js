/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const Iconup = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M510.395456 395.21518l312.373427 323.135538c18.416442 19.052938 48.273447 19.05293801 66.660212 0 18.416442-19.053961 18.416442-49.910737 0-68.964698L543.709189 291.75176c-18.416442-19.052938-48.273447-19.05293801-66.660212 0l-345.688183 357.633237c-9.207709 9.525957-13.796214 22.01234-13.796214 34.497699 0 12.48535899 4.588505 24.971741 13.82896 34.466999 18.416442 19.052938 48.242747 19.052938 66.660212 0L510.395456 395.21518z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

Iconup.defaultProps = {
  size: 18,
};

export default Iconup;
