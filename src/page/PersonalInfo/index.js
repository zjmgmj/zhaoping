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
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
    };
  }
  UNSAFE_componentWillMount() {
    this.getDetail();
  }
  getDetail() {
    const id = this.props.navigation.getParam('id');
    const userId = this.props.navigation.getParam('userId');
    global.httpGet('user/detail', {id: id, seluserId: userId}, res => {
      console.log('getDetail---', res);
      this.setState({
        userInfo: res.data,
      });
    });
  }
  render() {
    const {userInfo} = this.state;
    if (!userInfo) {
      return false;
    }
    return (
      <View style={[baseStyle.bgWhite, {flex: 1}]}>
        <Header
          title={userInfo.userNickname}
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
              <View style={sty.authorBox}>
                <Image style={sty.authorImg} source={{uri: userInfo.userPic}} />
              </View>
              <Text style={{marginTop: 5, textAlign: 'center'}}>
                {userInfo.userNickname}
              </Text>
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
              <Text style={[baseStyle.positionTitle, {marginLeft: 10}]}>
                个人简介
              </Text>
            </View>
            <View style={baseStyle.paddingTop}>
              <Text style={{marginBottom: 10}}>
                {userInfo.userIntroduction}
              </Text>
            </View>
            {/* <View style={[baseStyle.row, {paddingTop: 10}]}>
              <Image
                style={{width: 21, height: 21}}
                source={require('../../images/jiaoyu_icon.png')}
              />
              <Text style={[baseStyle.positionTitle, {marginLeft: 10}]}>
                教育经历
              </Text>
            </View>
            <View style={baseStyle.paddingTop}>
              <Text>北京大学 硕士学历</Text>
            </View> */}
          </View>
        </View>
      </View>
    );
  }
}

export default PersonalInfo;
const sty = StyleSheet.create({
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
  authorBox: {
    width: 70,
    height: 70,
    borderRadius: 100,
    overflow: 'hidden',
  },
  authorImg: {
    width: 70,
    height: 70,
    resizeMode: 'cover',
  },
});
