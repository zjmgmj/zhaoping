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
    this.state = {
      currentUser: {},
    };
  }
  UNSAFE_componentWillMount() {
    global.localStorage.get({key: 'currentUser'}).then(res => {
      this.setState({
        currentUser: res,
      });
    });
  }

  render() {
    const userAuthor = this.state.currentUser.userPic;
    return (
      <View style={baseStyle.bgWhite}>
        <View>
          <Image source={{uri: userAuthor}} style={sty.authorImg} />
          <TextInput
            style={{minHeight: 100}}
            placeholder="请输入内容1"
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
