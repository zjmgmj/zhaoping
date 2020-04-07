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
class JobStatus extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={[baseStyle.bgWhite, {flex: 1}]}>
        <Header
          title="求职状态"
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
            <Text>考虑机会</Text>
            {/* <Icontick color="#AC3E40" /> */}
          </View>
          <View style={[sty.flexContentBetween, sty.inforItem]}>
            <Text>随时到岗</Text>
            {/* <Icontick color="#AC3E40" /> */}
          </View>
          <View style={[sty.flexContentBetween, sty.inforItem]}>
            <Text>月内到岗</Text>
            <Icontick color="#AC3E40" />
          </View>
          <View style={[sty.flexContentBetween, sty.inforItem]}>
            <Text>暂不考虑</Text>
            {/* <Icontick color="#AC3E40" /> */}
          </View>
        </View>
      </View>
    );
  }
}

export default JobStatus;
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
