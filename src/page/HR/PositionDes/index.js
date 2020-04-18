import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
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
class PositionDes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocus: false,
      noteContent: '',
      height: 200,
    };
  }
  componentDidMount() {
    const {navigation} = this.props;
    this.setState({
      noteContent: navigation.getParam('positionDesc'),
    });
  }
  onChange = event => {
    this.setState({
      noteContent: event.nativeEvent.text,
      height: event.nativeEvent.contentSize.height,
    });
  };
  onContentSizeChange = event => {
    this.setState({
      height: event.nativeEvent.contentSize.height,
    });
  };
  savePosition() {
    const params = {
      positionDesc: this.state.noteContent,
    };
    this.props.navigation.state.params.callBack(params);
    this.props.navigation.goBack();
  }
  render() {
    const content = this.state.noteContent;
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
        <Text>请填写职位描述</Text>
        <Text style={[baseStyle.textGray, {marginTop: 10}]}>
          如：职位责任 工作内容 招聘要求
        </Text>
      </View>
    ) : null;
    return (
      <View style={[baseStyle.bgWhite, {flex: 1}]}>
        <Header
          title="职位描述"
          fullScreen
          right="确定"
          onRightPress={() => {
            this.savePosition();
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
            style={
              (baseStyle.relation,
              {minHeight: this.state.height > 200 ? this.state.height : 200})
            }>
            <TextInput
              ref={input => {
                this.textInput = input;
              }}
              style={[sty.inputContent, {height: this.state.height}]}
              multiline
              secureTextEntry={false}
              underlineColorAndroid={'transparent'}
              value={this.state.noteContent}
              onChangeText={noteContent =>
                this.setState({noteContent: noteContent})
              }
              onChange={() => this.onChange.bind(this)}
              onContentSizeChange={event => this.onContentSizeChange(event)}
            />
            {placeholder}
          </TouchableOpacity>
          <Button
            onPress={() => {
              this.savePosition();
            }}
            style={[sty.subBtn, {backgroundColor: '#D9B06F'}]}
            textStyle={{color: '#fff'}}>
            确定
          </Button>
        </ScrollView>
      </View>
    );
  }
}

export default PositionDes;
const sty = StyleSheet.create({
  inputContent: {
    lineHeight: 20,
    fontSize: 16,
    position: 'absolute',
    zIndex: 2,
    width: baseStyle.screenWidth - 20,
  },
});
