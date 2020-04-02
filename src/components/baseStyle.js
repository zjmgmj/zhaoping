import {Platform, StyleSheet, Dimensions} from 'react-native';
import {commonStyle} from './commonStyle';
const screenWidth = Dimensions.get('window').width;
export const baseStyle = StyleSheet.create({
  /** 背景 **/
  screenWidth: screenWidth,
  relation: {
    position: 'relative',
  },
  mainBg: {
    backgroundColor: '#FBFBFB',
  },
  bgWhite: {
    backgroundColor: '#FFF',
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
  textGray: {
    color: '#333333',
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
});
