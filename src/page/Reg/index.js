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
// import ZModal from '../../components/ZModal';
import Modal, {ModalContent} from 'react-native-modals';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class Reg extends Component {
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
  getSencodes() {
    httpGet('user/sencodes', {phone: this.state.phone}, res => {
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
        senCode: res.data,
      });
    });
  }
  regHandler() {
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
    if (!code || code !== senCode) {
      this.setState({
        modalShow: true,
        modalContent: '验证码错误',
      });
      return false;
    }
    const params = {
      userLogin: this.state.phone,
    };
    console.log('params', params);
    httpPost('user/save', params, res => {
      console.log('res', res);
      if (res.code === 1) {
        this.setState({
          modalShow: true,
          modalContent: '注册成功',
        });
        const me = this;
        setTimeout(() => {
          me.props.navigation.navigare('Login');
        }, 500);
      }
    });
  }
  componentDidMount() {
    clearInterval(this.state.sencodeInterval);
  }
  ModalToggleBox() {
    console.log('modalShow', this.state.modalShow);
    console.log('modalContent', this.state.modalContent);
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
          <Text style={{fontSize: 35, color: '#303135'}}>注册</Text>
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
                  onEndEditing={event => {
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
                    this.getSencodes();
                  }}>
                  {sencodeElem}
                  {/* <Text style={[baseStyle.textYellow, baseStyle.paddingLeft]}>
                    {this.state.timeShow ? this.state.time : '发送验证码'}
                  </Text> */}
                </TouchableOpacity>
              </View>
              <Button
                style={[baseStyle.bgYellow, {marginTop: 40}]}
                textStyle={baseStyle.textWhite}
                onPress={() => {
                  console.log('this.state.check', this.state.check);
                  if (this.state.check) {
                    this.regHandler();
                  } else {
                    this.setState({
                      modalShow: true,
                      modalContent: '请先同意协议',
                    });
                  }
                }}>
                注册
              </Button>
            </View>
            <TouchableOpacity
              activeOpacity={1}
              style={baseStyle.row}
              onPress={() => {
                this.setState({
                  check: !this.state.check,
                });
              }}>
              <Image
                style={sty.checkImg}
                source={this.state.check ? radioCheckImg : radioNullImg}
              />
              <Text style={{color: '#9B9B9B', marginLeft: 10}}>同意</Text>
              <Text style={baseStyle.textYellow}>
                《铜雀用户服务协议》和《铜雀隐私协议》
              </Text>
            </TouchableOpacity>
            {this.ModalToggleBox()}
          </View>
        </View>
      </View>
    );
  }
}

export default Reg;
const sty = StyleSheet.create({
  inputBottomSolid: {
    borderBottomColor: '#C9CFDF',
    borderBottomWidth: 0.5,
  },
  checkImg: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
});
