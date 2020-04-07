import React, {Component} from 'react';
import {Text, View, StyleSheet, ImageBackground, TextInput} from 'react-native';
import {baseStyle} from '../../components/baseStyle';
import {Iconsearch} from '../../iconfont/Iconsearch';

export default class Community extends Component {
  render() {
    return (
      <View style={[baseStyle.content, baseStyle.bgWhite]}>
        <View style={[baseStyle.row, sty.searchBox]}>
          <Iconsearch size={20} />
          <TextInput placeholder="搜索社群" style={sty.searchInput} />
        </View>
        <View style={sty.hotCommunity}>
          <View style={[baseStyle.row, baseStyle.justifyBetween]}>
            <Text
              style={[baseStyle.textBlack, baseStyle.ft16, baseStyle.fontBold]}>
              热门社群
            </Text>
            <Text style={baseStyle.textYellow}>查看更多</Text>
          </View>
          <View style={baseStyle.paddingTop}>
            <View style={[baseStyle.row, baseStyle.justifyBetween]}>
              <ImageBackground
                style={sty.hotCommunityItem}
                source={require('../../images/hot_community_1.png')}>
                <Text>面试经验</Text>
                <Text style={[baseStyle.ft12, baseStyle.textGray]}>
                  传统面试与线上面试
                </Text>
              </ImageBackground>
              <ImageBackground
                style={sty.hotCommunityItem}
                source={require('../../images/hot_community_2.png')}>
                <Text>面试经验</Text>
                <Text style={[baseStyle.ft12, baseStyle.textGray]}>
                  传统面试与线上面试
                </Text>
              </ImageBackground>
            </View>
            <View
              style={[
                baseStyle.row,
                baseStyle.paddingTop,
                baseStyle.justifyBetween,
              ]}>
              <ImageBackground
                style={sty.hotCommunityItem}
                source={require('../../images/hot_community_3.png')}>
                <Text>职场课程</Text>
                <Text style={[baseStyle.ft12, baseStyle.textGray]}>
                  职场技巧大展示
                </Text>
              </ImageBackground>
              <ImageBackground
                style={sty.hotCommunityItem}
                source={require('../../images/hot_community_4.png')}>
                <Text>人脉圈子</Text>
                <Text style={[baseStyle.ft12, baseStyle.textGray]}>
                  人脉+钱脉
                </Text>
              </ImageBackground>
            </View>
          </View>
        </View>
        <View style={sty.hotCommunity}>
          <View style={[baseStyle.row, baseStyle.justifyBetween]}>
            <Text
              style={[baseStyle.textBlack, baseStyle.ft16, baseStyle.fontBold]}>
              其他社群
            </Text>
            <Text style={baseStyle.textYellow}>查看更多</Text>
          </View>
          <View style={[baseStyle.row, {flexWrap: 'wrap', paddingTop: 15}]}>
            <View style={sty.ortherItem}>
              <Text>职场课程</Text>
            </View>
            <View style={sty.ortherItem}>
              <Text>职场课程</Text>
            </View>
            <View style={sty.ortherItem}>
              <Text>职场课程</Text>
            </View>
            <View style={sty.ortherItem}>
              <Text>职场课程</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const sty = StyleSheet.create({
  searchBox: {
    backgroundColor: '#F2F6FB',
    borderRadius: 50,
    paddingLeft: 10,
    paddingRight: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
  },
  hotCommunity: {
    marginTop: 20,
  },
  hotCommunityItem: {
    width: baseStyle.screenWidth / 2 - 25,
    height: 68,
    padding: 12,
    flexDirection: 'column',
    justifyContent: 'space-between',
    resizeMode: 'contain',
  },
  ortherItem: {
    marginTop: 10,
    borderColor: '#D9B06F',
    borderRadius: 5,
    borderWidth: 1,
    width: baseStyle.screenWidth / 3.65,
    height: 30,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginRight: 10,
  },
});
