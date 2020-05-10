import React, {Component} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import Header from '../../../components/Header';
import {setStatusBar} from '../../../components/setStatusBar';
import {baseStyle} from '../../../components/baseStyle';
import DatePicker from 'react-native-datepicker';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class OnboardingSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocus: false,
      content: '',
      height: 200,
      params: {
        intdate: null,
      },
      intdateStr: null,
      inttypeStr: '现场面试',
    };
  }
  refuse() {
    const userId = this.props.navigation.getParam('userId');
    const positionRecordId = this.props.navigation.getParam('positionRecordId');
    const param = {
      id: positionRecordId,
      userId: userId,
      status: '6',
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
  render() {
    const {intdateStr} = this.state;
    return (
      <View style={[baseStyle.bgWhite, {flex: 1}]}>
        <Header
          title="设置入职时间"
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
          <View style={[baseStyle.borderBottom, sty.inputBox]}>
            <Text>入职时间</Text>
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
                {intdateStr ? intdateStr : '入职时间选择'}
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
                format="YYYY/MM/DD"
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
        </ScrollView>
      </View>
    );
  }
}

export default OnboardingSet;
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
