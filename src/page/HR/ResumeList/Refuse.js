import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  // SafeAreaView,
} from 'react-native';
import {Button} from 'beeshell/dist/components/Button';
import Header from '../../../components/Header';
import {setStatusBar} from '../../../components/setStatusBar';
import {baseStyle} from '../../../components/baseStyle';
import {Iconright} from '../../../iconfont/Iconright';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class Refuse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocus: false,
      content: '',
      height: 200,
    };
  }
  onChange = event => {
    this.setState({
      content: event.nativeEvent.text,
      height: event.nativeEvent.contentSize.height,
    });
  };
  onContentSizeChange = event => {
    this.setState({
      height: event.nativeEvent.contentSize.height,
    });
  };
  refuse() {
    if (!this.state.content) {
      Alert.alert('提示', '请输入拒绝理由');
      return false;
    }
    const userId = this.props.navigation.getParam('userId');
    const positionId = this.props.navigation.getParam('positionId');
    const params = {
      positionId: positionId,
      userId: userId,
      status: 1,
      refuseDesc: this.state.content,
    };
    global.httpPost(
      'positionrecord/update',
      params,
      res => {
        console.log(res);
        this.props.navigation.goBack();
      },
      err => {
        console.log(err);
      },
    );
    // this.props.navigation.state.params.callBack(params);
  }
  render() {
    const content = this.state.content;
    const placeholder = !content ? (
      <View
        style={{
          position: 'absolute',
          top: 10,
          left: 0,
          zIndex: 1,
          height: 200,
          width: baseStyle.screenWidth - 20,
        }}>
        <Text style={baseStyle.textGray}>请输入拒绝理由</Text>
      </View>
    ) : null;
    return (
      <View style={[baseStyle.bgWhite, {flex: 1}]}>
        <Header
          title="拒绝面试"
          fullScreen
          right="确定"
          onRightPress={() => {
            this.refuse();
          }}
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <ScrollView style={baseStyle.content}>
          <TouchableOpacity
            onPress={() => {
              this.textInput.focus();
            }}
            activeOpacity={1}
            style={[
              baseStyle.relation,
              {
                minHeight: this.state.height > 200 ? this.state.height : 200,
                backgroundColor: '#FAF9F9',
              },
            ]}>
            <TextInput
              ref={input => {
                this.textInput = input;
              }}
              style={[sty.inputContent, {height: this.state.height}]}
              multiline
              secureTextEntry={false}
              underlineColorAndroid={'transparent'}
              value={this.state.content}
              onChangeText={content => this.setState({content: content})}
              onChange={() => this.onChange.bind(this)}
              onContentSizeChange={event => this.onContentSizeChange(event)}
            />
            {placeholder}
          </TouchableOpacity>
          <Button
            onPress={() => {
              this.savePosition();
            }}
            style={[sty.subBtn, {backgroundColor: '#D9B06F', marginTop: 20}]}
            textStyle={{color: '#fff'}}>
            简历委托
          </Button>
        </ScrollView>
      </View>
    );
  }
}

export default Refuse;
const sty = StyleSheet.create({
  inputContent: {
    lineHeight: 20,
    fontSize: 16,
    position: 'absolute',
    zIndex: 2,
    width: baseStyle.screenWidth - 20,
  },
});
