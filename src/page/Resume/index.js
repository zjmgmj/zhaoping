import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  PixelRatio,
  Text,
  TextInput,
} from 'react-native';
import {Button} from 'beeshell/dist/components/Button';
import Header from '../../components/Header';
import {setStatusBar} from '../../components/setStatusBar';
import {baseStyle} from '../../components/baseStyle';

class NotData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      list: [],
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
        console.log(res);
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
    return (
      <View style={sty.notDataBox}>
        <View>
          <Image
            style={sty.notDataImg}
            source={require('../../images/not_data.png')}
          />
        </View>
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
    };
  }

  render() {
    return (
      <View style={baseStyle.bgWhite}>
        <Header
          fullScreen
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <NotData
          onPressAdd={() => {
            this.props.navigation.navigate('ResumeAdd', {
              callBack: res => {
                console.log(res);
              },
            });
          }}
        />
      </View>
    );
  }
}

export default Resume;
const sty = StyleSheet.create({
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
