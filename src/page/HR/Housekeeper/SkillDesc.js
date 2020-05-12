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
import {Button} from 'beeshell/dist/components/Button';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class SkillDesc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocus: false,
      content: '',
      height: 200,
    };
  }
  UNSAFE_componentWillMount() {
    this.setState({
      content: this.props.navigation.getParam('skillDesc'),
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
  save() {
    this.props.navigation.state.params.callBack(this.state.content);
    this.props.navigation.goBack();
  }
  render() {
    const {content, skillDesc} = this.state;
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
        <Text style={baseStyle.textGray}>请输入职业技能</Text>
      </View>
    ) : null;
    return (
      <View style={[baseStyle.bgWhite, {flex: 1}]}>
        <Header
          title="职业技能"
          fullScreen
          right="确定"
          onRightPress={() => {
            this.save();
            console.log('---');
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
          <View style={(baseStyle.row, {justifyContent: 'center'})}>
            <Button
              onPress={() => {
                this.save();
              }}
              style={[sty.subBtn, {backgroundColor: '#D9B06F'}]}
              textStyle={{color: '#fff'}}>
              保存
            </Button>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default SkillDesc;
const sty = StyleSheet.create({
  subBtn: {
    height: 40,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 50,
    marginBottom: 40,
    borderRadius: 3,
  },
  inputContent: {
    lineHeight: 20,
    fontSize: 16,
    position: 'absolute',
    zIndex: 2,
    width: baseStyle.screenWidth - 20,
  },
});
