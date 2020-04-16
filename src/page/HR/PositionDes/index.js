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
    this.setState({
      noteContent: '1ssss',
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
    const params = {};
    global.httpPost('position/save', params, res => {
      console.log(res);
    });
  }
  render() {
    const isFocus = this.state.isFocus;
    const placeholder = (
      <View style={{position: 'absolute', top: 10, left: 0}}>
        <Text>请填写职位描述</Text>
        <Text style={[baseStyle.textGray, {marginTop: 10}]}>
          如：职位责任 工作内容 招聘要求
        </Text>
      </View>
    );
    return (
      <View style={[baseStyle.bgWhite, {flex: 1}]}>
        <Header
          title="职位类别"
          fullScreen
          right="确定"
          onRightPress={() => {
            console.log('确定');
          }}
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <ScrollView style={baseStyle.content}>
          <View style={baseStyle.relation}>
            <TextInput
              style={[sty.inputContent, {height: this.state.height}]}
              multiline
              secureTextEntry={false}
              underlineColorAndroid={'transparent'}
              value={this.state.noteContent}
              // onFocus={() => {
              //   this.setState({isFocus: true});
              // }}
              onChangeText={noteContent =>
                this.setState({noteContent: noteContent})
              }
              onChange={() => this.onChange.bind(this)}
              onContentSizeChange={event => this.onContentSizeChange(event)}
            />
            {/* {!this.state.noteContent ? placeholder : ''} */}
          </View>
          <Button
            onPress={() => {
              this.savePosition();
            }}
            style={[sty.subBtn, {backgroundColor: '#D9B06F'}]}
            textStyle={{color: '#fff'}}>
            发布
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
  },
});
