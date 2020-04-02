import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {baseStyle} from '../../components/baseStyle';

export default class Release extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={baseStyle.bgWhite}>
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
