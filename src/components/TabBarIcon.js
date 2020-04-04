import React from 'react';
import {StyleSheet, Image} from 'react-native';

const styles = StyleSheet.create({
  image: {
    height: 24,
  },
});

export default ({routeName, focused}) => {
  const images = {
    Home: focused
      ? require('../images/home_active_icon.png')
      : require('../images/home_icon.png'),
    Position: focused
      ? require('../images/position_active_icon.png')
      : require('../images/position_icon.png'),
    Dynamic: focused
      ? require('../images/dynamic_active_icon.png')
      : require('../images/dynamic_icon.png'),
    Mine: focused
      ? require('../images/mine_active_icon.png')
      : require('../images/mine_icon.png'),
  };
  return (
    <Image
      style={styles.image}
      source={images[routeName]}
      resizeMode="contain"
    />
  );
};
