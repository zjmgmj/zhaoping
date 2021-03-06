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
  title = '',
  left,
  right,
  color = '#000',
  style,
  rightStyle = {color: '#D9B06F'},
  fullScreen,
  onPressBack,
  onRightPress,
  isHeader = true,
  isBorder = true,
  titleElement = false,
  setHeadHeight,
}) => {
  const headerStyle = [
    styles.header,
    (fullScreen || isiOS()) && {
      height: STATUS_BAR_HEIGHT + HEADER_HEIGHT,
      paddingTop: STATUS_BAR_HEIGHT,
    },
    style,
  ];

  let isHeight = false;
  if (setHeadHeight && !isHeight) {
    setHeadHeight(fullScreen || isiOS() ? STATUS_BAR_HEIGHT : 0);
    isHeight = true;
  }
  const back = <Iconback color={color} />;
  const titleDom = <Text style={[styles.title, {color}]}>{title}</Text>;
  const titleRender = titleElement ? <View>{titleElement}</View> : titleDom;
  const headBox = isHeader ? (
    <View style={[headerStyle, isBorder ? styles.headBottomSolid : '']}>
      <TouchableOpacity
        style={styles.left}
        onPress={() => {
          onPressBack();
        }}>
        {left || back}
      </TouchableOpacity>
      {titleRender}
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
  headBottomSolid: {borderBottomColor: '#ccc', borderBottomWidth: 0.5},
  header: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
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
