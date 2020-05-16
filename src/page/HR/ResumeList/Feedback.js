import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from '../../../components/Header';
import {setStatusBar} from '../../../components/setStatusBar';
import {baseStyle} from '../../../components/baseStyle';
import {Switch} from 'beeshell/dist/components/Switch';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocus: false,
      content: '',
      height: 200,
      isanonymous: 1,
    };
  }
  UNSAFE_componentWillMount() {
    this.setState({
      content: this.props.navigation.getParam('intfeedback'),
      intfeedback: this.props.navigation.getParam('intfeedback'),
    });
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
    const userId = this.props.navigation.getParam('userId');
    const positionRecordId = this.props.navigation.getParam('positionRecordId');
    const {content, isanonymous} = this.state;

    const params = {
      id: positionRecordId,
      userId: userId,
      intfeedback: content,
      isanonymous: isanonymous,
    };
    global.httpPost(
      'positionrecord/update',
      params,
      res => {
        console.log(res);
        this.props.navigation.state.params.callBack();
        this.props.navigation.goBack();
      },
      err => {
        console.log(err);
      },
    );
  }
  render() {
    const {content, intfeedback} = this.state;
    const placeholder = !content ? (
      <View
        style={{
          position: 'absolute',
          top: 10,
          left: 0,
          zIndex: 1,
          height: 200,
          width: baseStyle.screenWidth - 20,
          isanonymous: 0,
        }}>
        <Text style={baseStyle.textGray}>请输入面试反馈</Text>
      </View>
    ) : null;
    return (
      <View style={[baseStyle.bgWhite, {flex: 1}]}>
        {intfeedback ? (
          <Header
            title="面试反馈"
            fullScreen
            onPressBack={() => {
              this.props.navigation.goBack();
            }}
          />
        ) : (
          <Header
            title="面试反馈"
            fullScreen
            right="确定"
            onRightPress={() => {
              this.refuse();
            }}
            onPressBack={() => {
              this.props.navigation.goBack();
            }}
          />
        )}

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
          {!intfeedback ? (
            <View
              style={[
                baseStyle.row,
                baseStyle.justifyBetween,
                {paddingTop: 20},
              ]}>
              <Text>是否匿名</Text>
              <Switch
                value={this.state.isanonymous}
                onChange={value => {
                  this.setState({isanonymous: value ? 1 : 0});
                }}
              />
            </View>
          ) : null}
        </ScrollView>
      </View>
    );
  }
}

export default Feedback;
const sty = StyleSheet.create({
  inputContent: {
    lineHeight: 20,
    fontSize: 16,
    position: 'absolute',
    zIndex: 2,
    width: baseStyle.screenWidth - 20,
  },
});
