import {Platform, StyleSheet, Dimensions, StatusBar} from 'react-native';
import {commonStyle} from './commonStyle';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const deviceScreenHeight = Dimensions.get('screen').height;
const statusBarHeight = StatusBar.currentHeight;
const deviceContentHeight = screenHeight - statusBarHeight;
export const baseStyle = StyleSheet.create({
  /** 背景 **/
  screenWidth: screenWidth,
  screenHeight: screenHeight,
  deviceScreenHeight,
  deviceContentHeight,
  statusBarHeight,
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
  textRed: {
    color: '#AC3E40',
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
  paddingBottom: {
    paddingBottom: 10,
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
  fullScreenMask: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .3)',
    alignItems: 'center',
  },
  authorBox: {
    width: 47,
    height: 47,
    borderRadius: 100,
    overflow: 'hidden',
    // borderColor: '#000',
    // borderWidth: 0.5,
  },
  authorImg: {
    width: 47,
    height: 47,
    resizeMode: 'cover',
  },
  authorBoxMin: {
    width: 29,
    height: 29,
    borderRadius: 100,
    overflow: 'hidden',
  },
  authorImgMin: {
    width: 29,
    height: 29,
    resizeMode: 'cover',
  },
  authorName: {
    fontSize: 16,
  },
  marginRight: {
    marginRight: 10,
  },
  footBtn: {
    position: 'absolute',
    flex: 1,
    bottom: 0,
    left: 0,
    right: 0,
    paddingLeft: 20,
    paddingRight: 20,
    zIndex: 1,
  },
  footBtnRel: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  logoBox: {
    width: 54,
    height: 64,
    overflow: 'hidden',
    borderColor: '#979797',
    borderWidth: 0.5,
  },
  logoImg: {
    width: 53,
    height: 64,
    resizeMode: 'cover',
  },
  positionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  companyName: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});
