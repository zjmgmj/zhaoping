import {Platform, StyleSheet, Dimensions} from 'react-native';
import {commonStyle} from '../../../components/commonStyle';
const screenWidth = Dimensions.get('window').width;
export const sty = StyleSheet.create({
  row: commonStyle.row,
  noticeStyle: {
    height: 26,
    paddingLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
    ...Platform.select({
      ios: {
        lineHeight: 26,
      },
      android: {},
    }),
  },
  hornImg: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
  hotImg: {
    width: 78,
    height: 58,
    resizeMode: 'contain',
  },
  banner: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  bannerImg: {
    width: screenWidth - 20,
    height: 150,
    resizeMode: 'contain',
  },
  notice: {
    padding: 10,
    flexDirection: 'row',
  },
  tabContent: {
    height: 40,
    color: '#000',
  },
  newDetail: {
    color: '#000',
    fontSize: 12,
    paddingTop: 5,
  },
  newItem: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 10,
    paddingBottom: 20,
    paddingTop: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
  },
  positionTab: {
    justifyContent: 'space-between',
  },
  tabName: {
    height: 30,
    marginRight: 20,
  },
  tabNameActive: {
    fontWeight: 'bold',
    borderBottomColor: '#D9B06F',
    borderBottomWidth: 2.5,
  },
  positionItem: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  positionTitle: {
    fontSize: 20,
  },
  positionImg: {
    width: 64,
    height: 64,
    resizeMode: 'cover',
  },
  positionTag: {
    marginRight: 10,
    // padding: 3,
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 3,
    paddingBottom: 3,
    backgroundColor: '#F1F3FC',
  },
  addIcon: {
    width: 55,
    height: 55,
    resizeMode: 'contain',
  },
  tag: {
    height: 20,
    width: 20,
    borderRadius: 100,
    backgroundColor: '#D9B06F',
  },
});
