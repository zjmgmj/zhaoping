/* eslint-disable */

import { FunctionComponent } from 'react';
// Don't forget to install package: @types/react-native
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';

interface Props extends GProps, ViewProps {
  name: 'jiantouUp' | 'jiantouDown' | 'Share' | 'tick' | 'edit' | 'add' | 'circleAdd' | 'search' | 'back' | 'down' | 'up' | 'right';
  size?: number;
  color?: string | string[];
}

export declare const Icon: FunctionComponent<Props>;

export default Icon;
