import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  // SafeAreaView,
} from 'react-native';
// import {Button} from './node_modules/beeshell/dist/components/Button';
import Header from '../../../components/Header';
import {setStatusBar} from '../../../components/setStatusBar';
import {baseStyle} from '../../../components/baseStyle';
import {Iconright} from '../../../iconfont/Iconright';
import {Icontick} from '../../../iconfont/Icontick';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class WorkAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  savePosition() {
    // const params = {};
    // global.httpPost('position/save', params, res => {
    //   console.log(res);
    // });
  }
  render() {
    const iconRightFontColor = '#D6D0D0';
    return (
      <View style={[baseStyle.bgWhite, {flex: 1}]}>
        <Header
          title="职位类别"
          fullScreen
          right="确定"
          onRightPress={() => {
            console.log('确定');
          }}
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <ScrollView style={baseStyle.content}>
          <View>
            <View style={[baseStyle.borderBottom, sty.inputBox]}>
              <Text>高级管理</Text>
              <Iconright color={iconRightFontColor} style={sty.Iconright} />
            </View>
            <View
              style={{
                backgroundColor: '#FBFBFB',
                paddingTop: 10,
                paddingBottom: 10,
              }}>
              <TouchableOpacity style={sty.childItem}>
                <Text style={baseStyle.textYellow}>人力资源主管</Text>
                <Icontick color="#D9B06F" />
              </TouchableOpacity>
              <TouchableOpacity style={sty.childItem}>
                <Text>人力资源助理</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View style={[baseStyle.borderBottom, sty.inputBox]}>
              <Text>高级管理</Text>
              <Iconright color={iconRightFontColor} style={sty.Iconright} />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default WorkAddress;
const sty = StyleSheet.create({
  subBtn: {
    height: 40,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 50,
    marginBottom: 40,
    borderRadius: 3,
  },
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
    // position: 'absolute',
    // right: 0,
    // bottom: 10,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingBottom: 15,
  },
  textInputSty: {
    textAlign: 'right',
    width: 300,
    padding: 0,
  },
  childItem: {
    color: '#D9B06F',
    paddingBottom: 12,
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
