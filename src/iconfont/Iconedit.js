/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const Iconedit = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M791.582118 463.269647c-5.150118-8.914824-14.546824-15.179294-25.750588-15.179294-11.173647 0-20.540235 6.234353-25.720471 15.058824-2.680471-0.692706-4.336941-0.060235-4.336941 4.487529l0 293.044706c0 21.534118-17.980235 39.062588-40.026353 39.062588L235.580235 799.744c-22.046118 0-40.026353-17.528471-40.026353-39.062588 0 0 0-507.934118 0-527.480471 0-21.564235 17.950118-39.062588 40.026353-39.062588L595.727059 194.138353c2.288941 0 3.463529-0.451765 4.156235-1.144471 1.957647 0.391529 3.794824 1.144471 5.842824 1.144471 16.564706 0 30.027294-13.131294 30.027294-29.304471 0-16.173176-13.462588-29.304471-30.027294-29.304471-2.409412 0-4.517647 0.813176-6.806588 1.325176C598.196706 136.041412 597.142588 135.529412 595.727059 135.529412L215.582118 135.529412C171.429647 135.529412 135.529412 170.586353 135.529412 213.684706l0 566.543059c0 43.098353 35.900235 78.155294 80.052706 78.155294l500.224 0c44.152471 0 80.022588-35.056941 80.022588-78.155294L795.828706 467.636706C795.828706 465.106824 794.142118 463.841882 791.582118 463.269647zM848.203294 144.986353c-12.438588-10.691765-31.412706-9.517176-42.375529 2.620235L342.949647 660.720941c-10.962824 12.137412-9.758118 30.659765 2.680471 41.351529 12.438588 10.691765 31.412706 9.517176 42.375529-2.620235l462.908235-513.084235C861.816471 174.230588 860.641882 155.678118 848.203294 144.986353z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

Iconedit.defaultProps = {
  size: 18,
};

export default Iconedit;
