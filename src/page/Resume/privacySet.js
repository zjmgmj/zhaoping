import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Header from '../../components/Header';
import {setStatusBar} from '../../components/setStatusBar';
import {baseStyle} from '../../components/baseStyle';
import {Icontick} from '../../iconfont/Icontick';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class PrivacySet extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={[baseStyle.bgWhite, {flex: 1}]}>
        <Header
          title="隐私设置"
          right="确认"
          fullScreen
          onRightPress={() => {
            console.log('保存');
          }}
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <View style={[baseStyle.paddingLeft, baseStyle.paddingRight]}>
          <View style={[sty.flexContentBetween, sty.inforItem]}>
            <Text>可见</Text>
            {/* <Icontick color="#AC3E40" /> */}
          </View>
          <View style={[sty.flexContentBetween, sty.inforItem]}>
            <Text>不可见</Text>
            <Icontick color="#AC3E40" />
          </View>
        </View>
      </View>
    );
  }
}

export default PrivacySet;
const sty = StyleSheet.create({
  flexContentBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inforItem: {
    paddingBottom: 15,
    paddingTop: 15,
    borderBottomColor: '#E8E7E7',
    borderBottomWidth: 1,
  },
});
