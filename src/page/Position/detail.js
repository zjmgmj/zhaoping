import React, {Component} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Header from '../../components/Header';
import {setStatusBar} from '../../components/setStatusBar';
import {Card} from 'react-native-shadow-cards';
import {baseStyle} from '../../components/baseStyle';
import {Iconright} from '../../iconfont/Iconright';
import {IconShare} from '../../iconfont/IconShare';

@setStatusBar({
  barStyle: 'light-content',
  translucent: true,
  backgroundColor: 'transparent',
})
class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View>
        <ImageBackground
          style={sty.headSty}
          source={require('../../images/position_bg.png')}>
          <Header
            color="#fff"
            title="职位详情"
            onPressBack={() => {
              this.props.navigation.goBack();
            }}
            right={<IconShare color="#fff" size={20} />}
            fullScreen
            isBorder={false}
          />
        </ImageBackground>
        <ScrollView>
          <View style={[baseStyle.bgWhite, baseStyle.content]}>
            <View style={[baseStyle.row, baseStyle.justifyBetween]}>
              <Text style={baseStyle.ft16}>人力资源主管</Text>
              <Text style={baseStyle.textRed}>18-20K</Text>
            </View>
            <View style={[baseStyle.row, baseStyle.paddingTop]}>
              <View style={sty.positionTag}>
                <Text style={sty.textGray}>上海宝山区</Text>
              </View>
              <View style={sty.positionTag}>
                <Text style={sty.textGray}>1-3年</Text>
              </View>
              <View style={sty.positionTag}>
                <Text style={sty.textGray}>本科</Text>
              </View>
            </View>
            <View
              style={[
                baseStyle.flex,
                baseStyle.justifyBetween,
                baseStyle.paddingTop,
              ]}>
              <Text style={[baseStyle.textGray, baseStyle.ft12]}>
                1天前发布
              </Text>
              <View style={sty.attentionBtn}>
                <Text style={[baseStyle.textYellow, baseStyle.ft12]}>
                  关注职位
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Detail;

const sty = StyleSheet.create({
  headSty: {
    width: baseStyle.screenWidth,
    height: 89,
    resizeMode: 'contain',
  },
  authorImg: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
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
  attentionBtn: {
    borderColor: '#D9B06F',
    borderRadius: 15,
    borderWidth: 0.5,
    padding: 4,
    paddingLeft: 15,
    paddingRight: 15,
  },
});
