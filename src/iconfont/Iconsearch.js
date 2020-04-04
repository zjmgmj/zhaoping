/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const Iconsearch = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M1008.64 936.96L819.2 747.52c61.44-76.8 102.4-179.2 102.4-286.72C921.6 204.8 716.8 0 460.8 0S0 204.8 0 460.8s204.8 460.8 460.8 460.8c107.52 0 209.92-35.84 286.72-102.4l189.44 189.44c10.24 10.24 25.6 15.36 35.84 15.36s25.6-5.12 35.84-15.36c20.48-20.48 20.48-51.2 0-71.68zM460.8 819.2c-199.68 0-358.4-158.72-358.4-358.4s158.72-358.4 358.4-358.4 358.4 158.72 358.4 358.4-158.72 358.4-358.4 358.4z"
        fill={getIconColor(color, 0, '#CDCDCD')}
      />
    </Svg>
  );
};

Iconsearch.defaultProps = {
  size: 18,
};

export default Iconsearch;
