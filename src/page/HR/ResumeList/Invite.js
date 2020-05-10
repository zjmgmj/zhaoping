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
import Picker from '../../../components/picker';
import {TopviewGetInstance} from 'beeshell';
import DatePicker from 'react-native-datepicker';
import {Iconright} from '../../../iconfont/Iconright';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class Invite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocus: false,
      content: '',
      height: 200,
      params: {
        inttype: 1,
        intdate: null,
      },
      intdateStr: null,
      inttypeStr: '现场面试',
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
    const userId = this.props.navigation.getParam('userId');
    const positionRecordId = this.props.navigation.getParam('positionRecordId');
    const param = {
      id: positionRecordId,
      userId: userId,
      intdesc: this.state.content,
      status: '1',
    };
    const params = Object.assign(param, this.state.params);
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
  openPicked() {
    const list = [{value: 1, label: '现场面试'}, {value: 2, label: '视频面试'}];
    TopviewGetInstance()
      .add(
        <Picker
          list={list}
          valueKey={'value'}
          labelKey={'label'}
          selected={this.state.params.inttype}
          close={() => {
            TopviewGetInstance().remove(this.state.pickId);
          }}
          selectedEvent={item => {
            const params = this.state.params;
            params.inttype = item.value;
            this.setState({
              params: params,
              inttypeStr: item.label,
            });
            TopviewGetInstance().remove(this.state.pickId);
          }}
        />,
      )
      .then(id => {
        this.setState({
          pickId: id,
        });
      });
  }
  render() {
    const iconRightFontColor = '#666666';
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
        <Text style={baseStyle.textGray}>请输入备注</Text>
      </View>
    ) : null;
    const {params, intdateStr} = this.state;
    return (
      <View style={[baseStyle.bgWhite, {flex: 1}]}>
        <Header
          title="邀请面试"
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
              this.openPicked();
            }}
            style={[baseStyle.borderBottom, sty.inputBox]}>
            <Text>面试方式选择</Text>
            <View style={[baseStyle.row]}>
              <Text
                style={
                  this.state.params.inttype
                    ? baseStyle.textYellow
                    : baseStyle.textGray
                }>
                {this.state.inttypeStr || '请选择'}
              </Text>
              {/* <Iconright color={iconRightFontColor} style={sty.Iconright} /> */}
            </View>
          </TouchableOpacity>
          <View style={[baseStyle.borderBottom, sty.inputBox]}>
            <Text>面试时间</Text>
            <View
              style={[
                {
                  flexDirection: 'row',
                  flex: 1,
                  alignItems: 'flex-end',
                  position: 'relative',
                },
              ]}>
              <Text
                style={{
                  textAlign: 'right',
                  flex: 1,
                  color: intdateStr ? '#D9B06F' : '#999',
                }}>
                {intdateStr ? intdateStr : '面试时间选择'}
              </Text>
              <DatePicker
                style={{
                  width: 200,
                  position: 'absolute',
                  zIndex: 1,
                  right: 0,
                  height: 30,
                  opacity: 0,
                }}
                date={this.state.date}
                mode="datetime"
                format="YYYY/MM/DD hh:mm"
                minDate="2016/05/01"
                maxDate="2222/06/01"
                showIcon={false}
                onDateChange={date => {
                  console.log('date', date);
                  const params = this.state.params;
                  params.intdate = new Date(date).getTime();
                  this.setState({
                    params,
                    intdateStr: date,
                  });
                }}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.textInput.focus();
            }}
            activeOpacity={1}
            style={[
              baseStyle.relation,
              {
                minHeight: this.state.height > 200 ? this.state.height : 200,
                backgroundColor: '#fff',
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
        </ScrollView>
      </View>
    );
  }
}

export default Invite;
const sty = StyleSheet.create({
  inputContent: {
    lineHeight: 20,
    fontSize: 16,
    position: 'absolute',
    zIndex: 2,
    width: baseStyle.screenWidth - 20,
  },
  inputBox: {
    paddingTop: 10,
    paddingBottom: 10,
    height: 50,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
