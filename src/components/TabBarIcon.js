import React from 'react';
import {StyleSheet, Image} from 'react-native';

const styles = StyleSheet.create({
  image: {
    height: 25,
    width: 25,
  },
});

export default ({routeName, focused}) => {
  console.log('routeName', routeName);
  const images = {
    Home: focused
      ? require('../images/home_active_icon.png')
      : require('../images/home_icon.png'),
    Position: focused
      ? require('../images/position_active.png')
      : require('../images/position.png'),
    Dynamic: focused
      ? require('../images/dynamic_active_icon.png')
      : require('../images/dynamic_icon.png'),
    Info: focused
      ? require('../images/info_active_icon.png')
      : require('../images/info_icon.png'),
    Mine: focused
      ? require('../images/mine_active_icon.png')
      : require('../images/mine_icon.png'),
    RecruitmentManagement: focused
      ? require('../images/rec_active_icon.png')
      : require('../images/rec_icon.png'),
    AddressBook: focused
      ? require('../images/address_book_active_icon.png')
      : require('../images/address_book_icon.png'),
  };
  return (
    <Image
      style={styles.image}
      source={images[routeName]}
      resizeMode="contain"
    />
  );
};
