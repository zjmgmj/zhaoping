import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  PixelRatio,
  TextInput,
} from 'react-native';
import Header from '../../components/Header';
import {setStatusBar} from '../../components/setStatusBar';
import {baseStyle} from '../../components/baseStyle';
import {selectPhotoTapped} from '../../components/SelectPhotoTapped';
@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class Evaluation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selfEvaluation: '',
    };
  }

  render() {
    return (
      <View style={[baseStyle.bgWhite, {height: baseStyle.screenHeight}]}>
        <Header
          title="自我评价"
          right="确定"
          rightStyle={baseStyle.textYellow}
          fullScreen
          onRightPress={() => {
            console.log('----');
            this.props.navigation.state.params.callBack(
              this.state.selfEvaluation,
            );
            this.props.navigation.goBack();
          }}
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <View style={sty.textInputBoxSty}>
          <TextInput
            style={baseStyle.paddingLeft}
            placeholder="请输入内容"
            multiline
            defaultValue={this.props.navigation.getParam('selfEvaluation')}
            value={this.state.selfEvaluation}
            onChange={e => {
              this.setState({
                selfEvaluation: e.nativeEvent.text,
              });
            }}
          />
        </View>
      </View>
    );
  }
}

export default Evaluation;
const sty = StyleSheet.create({});
