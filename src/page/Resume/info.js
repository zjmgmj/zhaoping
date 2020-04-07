import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  // SafeAreaView,
} from 'react-native';
import {TextInputLayout} from 'rn-textinputlayout';
import Header from '../../components/Header';
import {setStatusBar} from '../../components/setStatusBar';
import {baseStyle} from '../../components/baseStyle';
import {Iconright} from '../../iconfont/Iconright';
// import Datepicker from 'beeshell/dist/components/Datepicker';
import {Scrollpicker, Datepicker, Button, BottomModal} from 'beeshell';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class ResumeInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
    };
  }
  renderSafeArea() {
    return (
      <View style={{maxHeight: 30}}>
        <View style={{flex: 1}}>
          <View style={{height: 60}} />
        </View>
      </View>
    );
  }
  render() {
    const iconRightFontColor = '#666666';
    const hintColor = '#333';
    return (
      <View style={[baseStyle.bgWhite, {flex: 1}]}>
        <Header
          title="个人信息"
          right="保存"
          fullScreen
          onRightPress={() => {
            console.log('保存');
          }}
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <ScrollView style={baseStyle.content}>
          <View style={[sty.flexContentBetween, sty.inforItem]}>
            <Text>头像</Text>
            <Image
              style={sty.authorImg}
              source={require('../../images/author.png')}
            />
          </View>
          <View style={sty.inputBox}>
            <TextInputLayout
              hintColor={hintColor}
              focusColor={iconRightFontColor}
              style={sty.inputLayout}>
              <TextInput
                defaultValue="李梅亭"
                style={sty.textInput}
                placeholder={'姓名'}
              />
            </TextInputLayout>
            <Iconright color={iconRightFontColor} style={sty.Iconright} />
          </View>
          <TouchableOpacity
            onPress={() => {
              this.basicModal.open();
            }}
            style={sty.inputBox}>
            <TextInputLayout
              hintColor={hintColor}
              focusColor={iconRightFontColor}
              style={sty.inputLayout}>
              <TextInput
                defaultValue="女"
                style={sty.textInput}
                placeholder={'性别'}
                editable={false}
              />
            </TextInputLayout>
            <Iconright color={iconRightFontColor} style={sty.Iconright} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.dateModal.open();
            }}
            style={sty.inputBox}>
            <TextInputLayout
              hintColor={hintColor}
              focusColor={iconRightFontColor}
              style={sty.inputLayout}>
              <TextInput
                defaultValue="2014.6"
                style={sty.textInput}
                placeholder={'参加工作时间'}
                editable={false}
              />
            </TextInputLayout>
            <Iconright color={iconRightFontColor} style={sty.Iconright} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.dateModal.open();
            }}
            style={sty.inputBox}>
            <TextInputLayout
              hintColor={hintColor}
              focusColor={iconRightFontColor}
              style={sty.inputLayout}>
              <TextInput
                defaultValue="1992.9"
                style={sty.textInput}
                placeholder={'出生年月'}
                editable={false}
              />
            </TextInputLayout>
            <Iconright color={iconRightFontColor} style={sty.Iconright} />
          </TouchableOpacity>
          <View style={sty.inputBox}>
            <TextInputLayout
              hintColor={hintColor}
              focusColor={iconRightFontColor}
              style={sty.inputLayout}>
              <TextInput
                defaultValue="1896773456"
                style={sty.textInput}
                placeholder={'手机号码'}
              />
            </TextInputLayout>
            <Iconright color={iconRightFontColor} style={sty.Iconright} />
          </View>
          <View style={sty.inputBox}>
            <TextInputLayout
              hintColor={hintColor}
              focusColor={iconRightFontColor}
              style={sty.inputLayout}>
              <TextInput
                defaultValue="89986799@qq.com"
                style={sty.textInput}
                placeholder={'电子邮箱'}
              />
            </TextInputLayout>
            <Iconright color={iconRightFontColor} style={sty.Iconright} />
          </View>
          <View style={sty.inputBox}>
            <TextInputLayout
              hintColor={hintColor}
              focusColor={iconRightFontColor}
              style={sty.inputLayout}>
              <TextInput
                defaultValue="zu178678990"
                style={sty.textInput}
                placeholder={'微信号码'}
              />
            </TextInputLayout>
            <Iconright color={iconRightFontColor} style={sty.Iconright} />
          </View>
        </ScrollView>
        <BottomModal
          ref={c => {
            this.dateModal = c;
          }}
          title="请选择日期"
          cancelable={true}>
          <View style={{paddingVertical: 15}}>
            <Datepicker
              style={{paddingHorizontal: 50}}
              proportion={[1, 1, 1]}
              startYear={2010}
              numberOfYears={10}
              date={this.state.date}
              onChange={value => {
                console.log(value);
                this.setState({
                  date: value,
                });
              }}
            />
          </View>
          {this.renderSafeArea()}
        </BottomModal>
        <BottomModal
          ref={c => {
            this.basicModal = c;
          }}
          title="请选择"
          cancelable={true}>
          <View style={{paddingVertical: 15}}>
            <Scrollpicker
              style={{paddingHorizontal: 0}}
              list={[['男', '女']]}
              onChange={data => {
                console.log(data);
              }}
            />
          </View>
          {this.renderSafeArea()}
        </BottomModal>
      </View>
    );
  }
}

export default ResumeInfo;
const sty = StyleSheet.create({
  authorImg: {
    width: 44,
    height: 44,
  },
  flexContentBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inforItem: {
    // paddingTop: 10,
    paddingBottom: 10,
    // height: 50,
    borderBottomColor: '#E8E7E7',
    borderBottomWidth: 1,
  },
  textInput: {
    fontSize: 16,
    height: 40,
    color: '#333',
  },
  inputLayout: {
    color: '#000',
    borderBottomColor: '#E8E7E7',
  },
  Iconright: {
    position: 'absolute',
    right: 0,
    bottom: 10,
  },
  inputBox: {
    position: 'relative',
    paddingTop: 10,
  },
});
