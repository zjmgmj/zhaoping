import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {setStatusBar} from '../../components/setStatusBar';
import Header from '../../components/Header';
import {baseStyle} from '../../components/baseStyle';
import {Button} from 'beeshell/dist/components/Button';
import {httpGet, httpPost} from '../../utils/httpUtil';
import Modal, {ModalContent} from 'react-native-modals';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: true,
      phone: '',
      time: 59,
      sencodeInterval: '',
      modalShow: false,
      modalContent: '',
      senCode: '',
      code: '',
    };
  }
  UNSAFE_componentWillMount() {
    global.localStorage.get({key: 'currentUser'}).then(res => {
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
    });
  }
  getSencodes() {
    const me = this;
    const sencodeTimeInterval = setInterval(() => {
      let time = me.state.time;
      time--;
      if (time === 0) {
        clearInterval(me.state.sencodeInterval);
        me.setState({
          timeShow: false,
        });
        return false;
      }
      me.setState({
        time: time,
      });
    }, 1000);
    me.setState({
      timeShow: true,
      sencodeInterval: sencodeTimeInterval,
    });
    // httpGet('user/sencodes', {phone: this.state.phone}, res => {
    //   me.setState({
    //     senCode: res.data,
    //   });
    // });
  }
  loginHandler() {
    const senCode = this.state.senCode;
    const code = this.state.code;
    const phone = this.state.phone;
    if (!phone) {
      this.setState({
        modalShow: true,
        modalContent: '请输入手机号码',
      });
      return false;
    }
    // if (!code || code !== senCode) {
    //   this.setState({
    //     modalShow: true,
    //     modalContent: '验证码错误',
    //   });
    //   return false;
    // }
    const params = {
      phone: this.state.phone,
    };
    console.log('params', params);
    httpGet('user/login', params, res => {
      console.log('res', res);
      if (res.code === 1) {
        const userInfo = res.data;
        userInfo.isLogin = true;
        // userInfo.userType = 1; // 招聘官
        userInfo.userType = 2; // 智推官
        global.localStorage.set({
          key: 'currentUser',
          data: userInfo,
          expires: null,
        });
        this.props.navigation.navigate('HrMain');

        // console.log('登陆成功');
      }
    });
  }
  getUserInfo() {
    httpGet('user/detail', {id: ''}, res => {
      console.log('res', res);
      // if (res.code === 1) {
      //   this.props.navigation.navigate('Main');
      //   console.log('登陆成功');
      // }
    });
  }
  componentDidMount() {
    clearInterval(this.state.sencodeInterval);
  }
  ModalToggleBox() {
    return (
      <Modal
        visible={this.state.modalShow}
        onTouchOutside={() => {
          this.setState({
            modalShow: false,
          });
        }}>
        <ModalContent>
          <Text>{this.state.modalContent}</Text>
        </ModalContent>
      </Modal>
    );
  }
  render() {
    const radioNullImg = require('../../images/radio_null_icon.png');
    const radioCheckImg = require('../../images/radio_check_icon.png');
    let sencodeElem = (
      <Text
        style={[
          baseStyle.textYellow,
          baseStyle.paddingLeft,
          {textAlign: 'center'},
        ]}>
        发送验证码
      </Text>
    );
    if (this.state.timeShow) {
      sencodeElem = (
        <Text style={[baseStyle.paddingLeft, {textAlign: 'center'}]}>
          {this.state.time}
        </Text>
      );
    }
    return (
      <View>
        <Header
          fullScreen
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <View
          style={[baseStyle.content, {height: baseStyle.screenHeight - 80}]}>
          <Text style={{fontSize: 35, color: '#303135'}}>登陆</Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <View style={{paddingTop: 40}}>
              <View style={sty.inputBottomSolid}>
                <TextInput
                  keyboardType="numeric"
                  placeholder="请输入手机号码"
                  onChange={event => {
                    this.setState({
                      phone: event.nativeEvent.text,
                    });
                  }}
                />
              </View>
              <View
                style={[
                  baseStyle.row,
                  baseStyle.justifyBetween,
                  sty.inputBottomSolid,
                  {marginTop: 25},
                ]}>
                <TextInput
                  style={{
                    flex: 1,
                    borderRightColor: '#979797',
                    borderRightWidth: 0.5,
                  }}
                  keyboardType="numeric"
                  placeholder="请输入验证码"
                  onChange={event => {
                    this.setState({
                      code: event.nativeEvent.text,
                    });
                  }}
                />
                <TouchableOpacity
                  style={{width: 100}}
                  activeOpacity={1}
                  onPress={() => {
                    // this.getSencodes();
                  }}>
                  {sencodeElem}
                </TouchableOpacity>
              </View>
              <Button
                style={[{marginTop: 40, backgroundColor: '#BAC2DB'}]}
                textStyle={baseStyle.textWhite}
                onPress={() => {
                  this.loginHandler();
                }}>
                登陆
              </Button>
            </View>
            {this.ModalToggleBox()}
          </View>
        </View>
      </View>
    );
  }
}

export default Login;
const sty = StyleSheet.create({
  inputBottomSolid: {
    borderBottomColor: '#C9CFDF',
    borderBottomWidth: 0.5,
  },
});
