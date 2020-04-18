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
class PositionName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }
  componentDidMount() {
    this.getPositionType('', 0);
  }
  getPositionType(name, pid = 0) {
    this.setState({
      inputVal: name,
    });
    global.httpGet('positiontype/list', {name: name, pid: pid}, res => {
      console.log(res);
      this.setState({
        list: res.data,
      });
    });
  }
  savePosition(name) {
    const params = {
      positionName: name,
    };
    this.props.navigation.state.params.callBack(params);
    this.props.navigation.goBack();
  }
  render() {
    const iconRightFontColor = '#D6D0D0';
    return (
      <View style={[baseStyle.bgWhite, {flex: 1}]}>
        <Header
          title="职位名称"
          fullScreen
          right="确定"
          onRightPress={() => {
            this.savePosition(this.state.inputVal);
          }}
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <View style={baseStyle.content}>
          <TextInput
            placeholder="请输入职位名称"
            onChange={e => {
              console.log(e.nativeEvent.text);
              this.getPositionType(e.nativeEvent.text);
            }}
            style={baseStyle.borderBottom}
          />
          <ScrollView
            style={
              (baseStyle.paddingTop,
              {marginTop: 20, height: baseStyle.screenHeight - 180})
            }>
            {this.state.list.map(item => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    console.log('selected');
                    this.savePosition(item.name);
                  }}
                  style={[baseStyle.borderBottom, sty.nameItem]}>
                  <Text>{item.name}</Text>
                  <Iconright color={iconRightFontColor} style={sty.Iconright} />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default PositionName;
const sty = StyleSheet.create({
  nameItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingBottom: 15,
  },
  textInput: {},
});
