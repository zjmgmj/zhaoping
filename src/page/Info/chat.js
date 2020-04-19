import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import {setStatusBar} from '../../components/setStatusBar';
import Header from '../../components/Header';
import {baseStyle} from '../../components/baseStyle';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class Chat extends Component {
  render() {
    return (
      <View style={[{flex: 1, backgroundColor: '#fff'}]}>
        <Header
          titleElement={
            <View>
              <Text style={{textAlign: 'center'}}>李小姐</Text>
              <Text style={[baseStyle.textYellow, {textAlign: 'center'}]}>
                人力资源经理
              </Text>
            </View>
          }
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
          fullScreen
        />
        <ScrollView style={sty.scrollView}>
          <View style={[baseStyle.row, {marginBottom: 20}]}>
            <Image
              style={sty.authorImg}
              source={require('../../images/author.png')}
            />
            <View style={sty.leftChat}>
              <Text>麻烦把简历发我看一下</Text>
            </View>
          </View>
          <View style={[baseStyle.row, {justifyContent: 'flex-end'}]}>
            <View style={sty.rightChat}>
              <Text style={[baseStyle.textWhite, {textAlign: 'right'}]}>
                在吗在吗 我对您公司新发布职位感兴趣
              </Text>
            </View>
            <Image
              style={sty.authorImg}
              source={require('../../images/author.png')}
            />
          </View>
        </ScrollView>
        <View style={[sty.foot, baseStyle.row]}>
          <Image
            style={sty.iconSize}
            source={require('../../images/chat_yuyin_icon.png')}
          />
          <TextInput style={sty.chatInput} />
          <Image
            style={sty.iconSize}
            source={require('../../images/chat_bq_icon.png')}
          />
          <Image
            style={sty.iconSize}
            source={require('../../images/chat_add_icon.png')}
          />
        </View>
      </View>
    );
  }
}

export default Chat;
const sty = StyleSheet.create({
  scrollView: {
    height: baseStyle.screenHeight - 50,
    width: baseStyle.screenWidth,
    padding: 10,
  },
  authorImg: {
    width: 40,
    height: 40,
  },
  foot: {
    height: 50,
    width: baseStyle.screenWidth,
    backgroundColor: '#F9F0F3',
    borderTopColor: '#ccc',
    borderTopWidth: 0.5,
    padding: 10,
  },
  chatInput: {
    backgroundColor: '#fff',
    borderRadius: 4,
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    height: 35,
    lineHeight: 35,
  },
  iconSize: {
    width: 30,
    height: 30,
    marginRight: 5,
    marginLeft: 5,
  },
  leftChat: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    marginLeft: 10,
    borderRadius: 5,
  },
  rightChat: {
    backgroundColor: '#D9B06F',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
});
