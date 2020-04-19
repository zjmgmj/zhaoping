import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  // SafeAreaView,
} from 'react-native';
import {Button} from 'beeshell/dist/components/Button';
import Header from '../../../components/Header';
import {setStatusBar} from '../../../components/setStatusBar';
import {baseStyle} from '../../../components/baseStyle';
import {Iconright} from '../../../iconfont/Iconright';
import Picker from '../../../components/picker';
import {TopviewGetInstance} from 'beeshell';

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
    const list = this.state.newsList;
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
        <ScrollView style={baseStyle.content}>
          <View>
            <View style={baseStyle.borderBottom}>
              <TextInput placeholder="标题" />
            </View>
            <View>
              <TextInput placeholder="正文" />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default IndustryRelease;
const sty = StyleSheet.create({});
