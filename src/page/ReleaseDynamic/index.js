import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Head from '../../components/Head';
import {baseStyle} from '../../components/baseStyle';

export default class ReleaseDynamic extends Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    //标题
    headerTitle: '发布动态',
  });
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={baseStyle.bgWhite}>
        <Head title="发布动态" />
        <View>
          <Image
            source={require('../../images/author.png')}
            style={sty.authorImg}
          />
          <TextInput
            style={{minHeight: 100}}
            placeholder="请输入内容"
            multiline
          />
        </View>
      </View>
    );
  }
}

const sty = StyleSheet.create({
  authorImg: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});
