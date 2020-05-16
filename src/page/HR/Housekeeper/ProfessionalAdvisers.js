import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
  // SafeAreaView,
} from 'react-native';
import {Button} from 'beeshell/dist/components/Button';
import Header from '../../../components/Header';
import {setStatusBar} from '../../../components/setStatusBar';
import {baseStyle} from '../../../components/baseStyle';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class ProfessionalAdvisers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      detail: null,
    };
  }
  UNSAFE_componentWillMount() {
    global.localStorage.get({key: 'currentUser'}).then(res => {
      this.setState({
        currentUser: res,
      });
    });
    this.getDetail();
  }
  getDetail() {
    const detail = this.props.navigation.getParam('detail');
    this.setState({
      detail: detail,
    });
  }

  render() {
    const {detail} = this.state;
    const labels = detail.skillLabel ? detail.skillLabel.split(',') : [];
    return (
      <View style={[baseStyle.bgWhite]}>
        <Header
          title={`专业顾问${detail.userNickname}`}
          fullScreen
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <ScrollView
          style={[
            {
              height: baseStyle.screenHeight - 35,
            },
          ]}>
          <View
            style={[baseStyle.content, {paddingLeft: 20, paddingRight: 20}]}>
            <View
              style={[
                baseStyle.row,
                baseStyle.paddingBottom,
                baseStyle.borderBottom,
              ]}>
              <View style={baseStyle.authorBox}>
                <Image
                  source={{uri: detail.userPic}}
                  style={baseStyle.authorImg}
                />
              </View>
              <View style={baseStyle.paddingLeft}>
                <Text>{detail.userNickname}</Text>
                <View style={[baseStyle.row, {marginTop: 10}]}>
                  {detail.userSex === 2 ? (
                    <Image
                      source={require('../../../images/girl_icon.png')}
                      style={sty.iconSize}
                    />
                  ) : (
                    <Image
                      source={require('../../../images/man_icon.png')}
                      style={sty.iconSize}
                    />
                  )}
                  <Text style={{paddingLeft: 5}}>
                    {global.getSexStr(detail.userSex) || '男'}
                  </Text>
                </View>
              </View>
            </View>
            <View style={[baseStyle.row, baseStyle.paddingTop]}>
              <Image
                source={require('../../../images/work_pack_icon.png')}
                style={sty.iconSize}
              />
              <Text style={{paddingLeft: 5}}>职业技能</Text>
            </View>
            <View style={baseStyle.paddingTop}>
              <Text>{detail.skillDesc}</Text>
            </View>
            <View style={[baseStyle.row, baseStyle.paddingTop]}>
              <Image
                source={require('../../../images/tag_icon.png')}
                style={sty.iconSize}
              />
              <Text style={{paddingLeft: 5}}>TA的标签</Text>
            </View>
            <View style={[baseStyle.row, baseStyle.paddingTop]}>
              {labels.map((item, idx) => {
                <Text
                  key={idx}
                  style={[
                    baseStyle.textRed,
                    {
                      borderColor: '#AC3E40',
                      borderWidth: 0.5,
                      borderRadius: 10,
                      paddingLeft: 8,
                      paddingRight: 8,
                      marginRight: 10,
                    },
                  ]}>
                  {item}
                </Text>;
              })}
            </View>
            <View style={[baseStyle.row, {marginTop: 30, marginBottom: 30}]}>
              <Button
                onPress={() => {
                  this.delete();
                }}
                style={[
                  sty.subBtn,
                  {width: 109, borderColor: '#D9B06F', borderWidth: 0.5},
                ]}
                textStyle={{color: '#D9B06F'}}>
                联系ta
              </Button>
              <Button
                onPress={() => {
                  // this.save();
                  this.props.navigation.navigate('Applydesc', {
                    detail: detail,
                    currentUser: this.state.currentUser,
                    callBack: res => {
                      console.log(res);
                    },
                  });
                }}
                style={[sty.subBtn, {flex: 1, backgroundColor: '#D9B06F'}]}
                textStyle={{color: '#fff'}}>
                申请成为我的管家
              </Button>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const itemWidth = (baseStyle.screenWidth - 80) / 4;
export default ProfessionalAdvisers;
const sty = StyleSheet.create({
  playBox: {
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 187.5,
  },
  personText: {
    lineHeight: 25,
    marginTop: 10,
    padding: 10,
  },
  subBtn: {
    width: 140,
    paddingLeft: 0,
    paddingRight: 0,
    height: 40,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 3,
  },
  authorImgBox: {
    width: 60,
    height: 60,
    borderRadius: 100,
    overflow: 'hidden',
  },
  authorImg: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
  },
  iconSize: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
