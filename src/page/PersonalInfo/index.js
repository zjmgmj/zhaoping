import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {setStatusBar} from '../../components/setStatusBar';
import Header from '../../components/Header';
import {baseStyle} from '../../components/baseStyle';
@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class PersonalInfo extends Component {
  render() {
    return (
      <View style={[baseStyle.bgWhite, {height: baseStyle.screenHeight}]}>
        <Header
          title="陈珊"
          fullScreen
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <View style={baseStyle.content}>
          <View
            style={[
              baseStyle.row,
              baseStyle.justifyBetween,
              baseStyle.borderBottom,
              {paddingLeft: 40, paddingRight: 40, paddingBottom: 20},
            ]}>
            <View>
              <Image
                style={sty.authorImg}
                source={require('../../images/author.png')}
              />
              <Text style={{marginTop: 5, textAlign: 'center'}}>陈珊</Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                marginLeft: 30,
                width: 152,
              }}>
              <View style={[baseStyle.row, {justifyContent: 'space-around'}]}>
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                  <Text style={[baseStyle.ft16, sty.textCenter]}>1204</Text>
                  <Text style={[baseStyle.textGray, {marginTop: 10}]}>
                    关注
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                  <Text style={sty.textCenter}>23678</Text>
                  <Text style={[baseStyle.textGray, {marginTop: 10}]}>
                    粉丝
                  </Text>
                </View>
              </View>
              <View
                style={[
                  sty.status,
                  {flexDirection: 'row', justifyContent: 'center'},
                ]}>
                <Text style={[baseStyle.textWhite]}>已关注</Text>
              </View>
            </View>
          </View>
          <View style={{paddingTop: 20}}>
            <View style={baseStyle.row}>
              <Image
                style={{width: 21, height: 21}}
                source={require('../../images/bao_icon.png')}
              />
              <Text style={{marginLeft: 10}}>工作/实习经历</Text>
            </View>
            <View style={baseStyle.paddingTop}>
              <Text style={{marginBottom: 10}}>
                作为一名职业顾问，首先要具备超凡的沟通能力。来请职业规划师做咨询的客户一般正面临职场困境或职业瓶颈，他们的心情和状态都不会很好。
              </Text>
              <Text style={{marginBottom: 10}}>
                一名优秀的职业顾问应该是授人以渔的“伯乐”，不是通过测评结果告诉客户他应该去做什么，最适合做什么。而是通过自己的引导、启发去让客户自己发现打开职业大门的钥匙。要成为“伯乐就得自己修炼“道”。
              </Text>
            </View>

            <View style={baseStyle.row}>
              <Image
                style={{width: 21, height: 21}}
                source={require('../../images/jiaoyu_icon.png')}
              />
              <Text style={{marginLeft: 10}}>教育经历</Text>
            </View>
            <View style={baseStyle.paddingTop}>
              <Text>北京大学 硕士学历</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default PersonalInfo;
const sty = StyleSheet.create({
  authorImg: {
    width: 70,
    height: 70,
  },
  status: {
    // flex: 1,
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D9B06F',
    borderRadius: 17.5,
    marginTop: 10,
  },
  textCenter: {
    textAlign: 'center',
  },
});
