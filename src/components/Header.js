// import React, {Component} from 'react';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {Iconback} from '../iconfont/Iconback';
import {isiOS, isiPhoneX} from '../utils/device';
const STATUS_BAR_HEIGHT = isiOS()
  ? isiPhoneX()
    ? 34
    : 20
  : StatusBar.currentHeight;
const HEADER_HEIGHT = 44;

const Header = ({
  title = '666',
  left,
  right,
  color = '#000',
  style,
  rightStyle,
  fullScreen,
  onPressBack,
  onRightPress,
  isHeader = true,
}) => {
  debugger;
  const headerStyle = [
    styles.header,
    (fullScreen || isiOS()) && {
      height: STATUS_BAR_HEIGHT + HEADER_HEIGHT,
      paddingTop: STATUS_BAR_HEIGHT,
    },
    style,
  ];
  const back = <Iconback />;
  const headBox = isHeader ? (
    <View style={headerStyle}>
      <TouchableOpacity
        style={styles.left}
        onPress={() => {
          onPressBack();
        }}>
        {left || back}
      </TouchableOpacity>
      <Text style={[styles.title, {color}]}>{title}</Text>
      <TouchableOpacity
        onPress={() => {
          onRightPress();
        }}
        style={[styles.right]}>
        <Text style={rightStyle}>{right}</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={{paddingTop: STATUS_BAR_HEIGHT}} />
  );
  return headBox;
};

const styles = StyleSheet.create({
  header: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
  },
  title: {
    flex: 2,
    fontSize: 17,
    textAlign: 'center',
  },
  left: {
    flex: 1,
    flexDirection: 'row',
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default Header;
