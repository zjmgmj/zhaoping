import React, {Component, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Platform,
} from 'react-native';
import Header from '../../../components/Header';
import {setStatusBar} from '../../../components/setStatusBar';
import {baseStyle} from '../../../components/baseStyle';
import Editor from '../../../components/Editor';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class IndustryRelease extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  UNSAFE_componentWillMount() {}
  render() {
    return (
      <View style={[baseStyle.bgWhite, {flex: 1}]}>
        <Header
          title="行业资讯"
          fullScreen
          right="发布"
          onRightPress={() => {
            console.log('发布');
          }}
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <View style={baseStyle.content}>
          <View style={baseStyle.borderBottom}>
            <TextInput placeholder="标题" style={{height: 50}} />
          </View>
        </View>
        <Editor
          onChange={res => {
            console.log('change', res);
          }}
        />
      </View>
    );
  }
}

export default IndustryRelease;
const sty = StyleSheet.create({
  editBox: {
    width: baseStyle.screenWidth - 20,
    paddingTop: 15,
    minHeight: 200,
  },
});
