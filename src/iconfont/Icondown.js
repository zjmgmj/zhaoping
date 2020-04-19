/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const Icondown = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M513.604544 628.78482l-312.373427-323.135538c-18.416442-19.052938-48.273447-19.05293801-66.660212 0-18.416442 19.053961-18.416442 49.910737 0 68.964698L480.290811 732.24824c18.416442 19.052938 48.273447 19.05293801 66.660212 0l345.688183-357.633237c9.207709-9.525957 13.796214-22.01234 13.796214-34.497699 0-12.48535899-4.588505-24.971741-13.82896-34.466999-18.416442-19.052938-48.242747-19.052938-66.660212 0L513.604544 628.78482z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

Icondown.defaultProps = {
  size: 18,
};

export default Icondown;
