import React, {Component} from 'react';
import {View, ImageBackground, StyleSheet, Text} from 'react-native';
import {baseStyle} from '../../components/baseStyle';
import {setStatusBar} from '../../components/setStatusBar';
import {Button} from 'beeshell/dist/components/Button';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class Login extends Component {
  constructor(props) {
    super(props);
    global.localStorage
      .get({key: 'currentUser'})
      .then(res => {
        switch (res.userType) {
          case 1:
            this.props.navigation.navigate('HrMain');
            break;
          case 2:
            this.props.navigation.navigate('Main');
            break;
          default:
            console.log('登陆');
            break;
        }
      })
      .catch(value => {
        console.log('value');
      });
  }
  UNSAFE_componentWillMount() {
    global.localStorage
      .get({key: 'currentUser'})
      .then(res => {
        switch (res.userType) {
          case 1:
            this.props.navigation.navigate('HrMain');
            break;
          case 2:
            this.props.navigation.navigate('Main');
            break;
          default:
            console.log('登陆');
            break;
        }
      })
      .catch(value => {
        console.log('value');
      });
  }
  render() {
    return (
      <View>
        <ImageBackground
          style={sty.bg}
          source={require('../../images/login_bg.png')}>
          <View style={{marginTop: 150, paddingLeft: 35}}>
            <Text style={sty.ft20}>您好！</Text>
            <Text style={[baseStyle.paddingTop, sty.ft20]}>欢迎进入智推官</Text>
          </View>
          <View style={sty.loginBtnBox}>
            <Button
              onPress={() => {
                this.props.navigation.navigate('Login');
              }}
              color="#fff"
              style={sty.loginBtn}>
              登录
            </Button>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
export default Login;
const sty = StyleSheet.create({
  bg: {
    width: baseStyle.screenWidth,
    height: baseStyle.deviceScreenHeight,
  },
  loginBtnBox: {
    paddingLeft: 20,
    paddingRight: 20,
    position: 'absolute',
    bottom: 120,
    left: 0,
    right: 0,
  },
  loginBtn: {
    backgroundColor: '#fff',
    height: 56,
  },
  ft20: {
    fontSize: 20,
    color: '#fff',
  },
});
