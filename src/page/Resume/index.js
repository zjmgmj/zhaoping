import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  PixelRatio,
  Text,
  ScrollView,
} from 'react-native';
import {Button} from 'beeshell/dist/components/Button';
import Header from '../../components/Header';
import {setStatusBar} from '../../components/setStatusBar';
import {baseStyle} from '../../components/baseStyle';
// import editResume from './editResume';
import Iconright from '../../iconfont/Iconright';

class NotData extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={sty.notDataBox}>
        <View>
          <Image
            style={sty.notDataImg}
            source={require('../../images/not_data.png')}
          />
        </View>
        <View>
          <View style={sty.notDataMsg}>
            <Text>当前暂时无简历</Text>
          </View>
          <Button
            style={[sty.notDataBtn, baseStyle.bgYellow]}
            textStyle={baseStyle.textWhite}
            onPress={() => {
              this.props.onPressAdd();
            }}>
            添加简历
          </Button>
        </View>
      </View>
    );
  }
}

class ResumeItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const item = this.props.item;
    return (
      <View
        style={[
          baseStyle.row,
          baseStyle.justifyBetween,
          baseStyle.borderBottom,
          baseStyle.paddingBottom,
          baseStyle.paddingTop,
        ]}>
        <View style={baseStyle.row}>
          <View style={[baseStyle.authorBox, baseStyle.marginRight]}>
            <Image source={{uri: item.pic}} style={baseStyle.authorImg} />
          </View>
          <View>
            <View style={baseStyle.row}>
              <Text style={[baseStyle.fontBold, baseStyle.ft15]}>
                {item.name}
              </Text>
              <Text style={[baseStyle.ft13, {marginLeft: 10}]}>
                {item.resumeIntention}
              </Text>
            </View>
            <View style={[baseStyle.row, baseStyle.paddingTop]}>
              <Text>{global.getAge(item.birthDate)}岁</Text>
              <Text style={[sty.borderLeft, {marginLeft: 10, paddingLeft: 10}]}>
                工作{item.workyear}年
              </Text>
              <Text style={[sty.borderLeft, {marginLeft: 10, paddingLeft: 10}]}>
                {item.cityName}
                {item.regionName}
              </Text>
            </View>
          </View>
        </View>
        <Iconright color="#D3CECE" />
      </View>
    );
  }
}

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class Resume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgSource: [],
      videoSource: null,
      list: null,
      currentUser: null,
    };
  }
  UNSAFE_componentWillMount() {
    global.localStorage.get({key: 'currentUser'}).then(res => {
      this.setState({
        currentUser: res,
      });
      this.getResumeList();
    });
  }
  getResumeList() {
    global.httpGet(
      'resume/list',
      {
        page: 1,
        size: 10,
        userId: this.state.currentUser.userId,
      },
      res => {
        console.log('resumeList', res);
        this.setState({
          list: res.data.result,
        });
      },
      err => {
        console.log(err);
      },
    );
  }
  render() {
    const list = this.state.list;
    if (!list) {
      return false;
    }
    return (
      <View style={[baseStyle.bgWhite, {height: baseStyle.screenHeight}]}>
        <Header
          fullScreen
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
        />
        {list.length > 0 ? (
          <ScrollView style={baseStyle.content}>
            {list.map(item => {
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    this.props.navigation.navigate('ResumeAdd', {
                      id: item.id,
                      callBack: res => {
                        this.getResumeList();
                      },
                    });
                  }}>
                  <ResumeItem item={item} />
                </TouchableOpacity>
              );
            })}
            <View
              style={[
                baseStyle.row,
                {justifyContent: 'center', marginTop: 20},
              ]}>
              <Button
                style={[sty.notDataBtn, baseStyle.bgYellow]}
                textStyle={baseStyle.textWhite}
                onPress={() => {
                  this.props.navigation.navigate('ResumeAdd', {
                    callBack: res => {
                      this.getResumeList();
                    },
                  });
                }}>
                添加简历
              </Button>
            </View>
          </ScrollView>
        ) : (
          <NotData
            onPressAdd={() => {
              this.props.navigation.navigate('ResumeAdd', {
                callBack: res => {
                  this.getResumeList();
                },
              });
            }}
          />
        )}
      </View>
    );
  }
}

export default Resume;
const sty = StyleSheet.create({
  borderLeft: {
    borderLeftWidth: 0.5,
    borderLeftColor: '#979797',
  },
  author: {
    width: 47,
    height: 47,
    resizeMode: 'contain',
  },
  notDataBox: {
    paddingTop: 100,
    height: baseStyle.screenHeight,
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  notDataMsg: {
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  notDataBtn: {
    borderRadius: 5,
    width: 300,
  },
  notDataImg: {
    width: 91.5,
    height: 84.5,
  },
});
