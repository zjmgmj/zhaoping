import {Platform, StyleSheet, Dimensions} from 'react-native';
import {commonStyle} from './commonStyle';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
export const baseStyle = StyleSheet.create({
  /** 背景 **/
  screenWidth: screenWidth,
  screenHeight: screenHeight,
  relation: {
    position: 'relative',
  },
  mainBg: {
    backgroundColor: '#FBFBFB',
  },
  bgWhite: {
    backgroundColor: '#FFF',
  },
  bgYellow: {
    backgroundColor: '#D9B06F',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  flex: {
    flexDirection: 'row',
  },
  ft16: {
    fontSize: 16,
  },
  ft15: {
    fontSize: 15,
  },
  ft13: {
    fontSize: commonStyle.titleFont,
  },
  ft12: {
    fontSize: 12,
  },
  ft11: {
    fontSize: commonStyle.textFont,
  },
  fontBold: {
    fontWeight: 'bold',
  },
  textWhite: {
    color: '#fff',
  },
  textGray: {
    color: '#999999',
  },
  textBlack: {
    color: '#000',
  },
  textYellow: {
    color: commonStyle.textYellowColor,
  },
  borderBottom: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  paddingRight: {
    paddingRight: 10,
  },
  paddingLeft: {
    paddingLeft: 10,
  },
  paddingTop: {
    paddingTop: 10,
  },
  widthCol: col => {
    return screenWidth / col;
  },
  width_3: {
    width: screenWidth,
  },
  content: {
    padding: 15,
  },
});
