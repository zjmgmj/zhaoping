import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  // SafeAreaView,
} from 'react-native';
import {TextInputLayout} from 'rn-textinputlayout';
import Header from '../../components/Header';
import {setStatusBar} from '../../components/setStatusBar';
import {baseStyle} from '../../components/baseStyle';
import {Iconright} from '../../iconfont/Iconright';
// import Datepicker from 'beeshell/dist/components/Datepicker';
import {Scrollpicker, BottomModal, TopviewGetInstance} from 'beeshell';
import DatePicker from '../../components/DatePicker';
import Picker from '../../components/picker';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class WorkExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickId: null,
      date: '',
      salaryList: [],
      form: {
        projectName: '',
        projectDesc: '',
        projectEnd: new Date(),
        projectStart: new Date(),
        resumeId: this.props.navigation.getParam('id'),
      },
    };
  }
  renderSafeArea() {
    return (
      <View style={{maxHeight: 30}}>
        <View style={{flex: 1}}>
          <View style={{height: 60}} />
        </View>
      </View>
    );
  }
  setParams(key, value) {
    const form = this.state.form;
    form[key] = value;
    this.setState({
      form: form,
    });
  }
  getTime(time) {
    return global.dateMonth(new Date(time)).replace(/\//g, '.');
  }
  openPicked({list, key, valueKey, labelKey = 'label'}) {
    TopviewGetInstance()
      .add(
        <Picker
          list={list}
          labelKey={labelKey}
          valueKey={valueKey}
          selected={this.state.form[key]}
          close={() => {
            TopviewGetInstance().remove(this.state.pickId);
          }}
          selectedEvent={item => {
            const form = this.state.form;
            form[key] = item[valueKey];
            this.setState({
              form: form,
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
  save() {
    global.httpPost(
      'resumeprojectexp/save',
      this.state.form,
      res => {
        console.log('resumeprojectexp', res);
        this.props.navigation.state.params.callBack(this.state.form);
        this.props.navigation.goBack();
      },
      err => {
        console.log(err);
      },
    );
  }
  render() {
    const iconRightFontColor = '#666666';
    const hintColor = '#333';
    const form = this.state.form;
    return (
      <View style={[baseStyle.bgWhite, {flex: 1}]}>
        <Header
          title="项目经历"
          right="保存"
          fullScreen
          onRightPress={() => {
            console.log('保存');
            this.save();
            this.props.navigation.goBack();
          }}
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <ScrollView style={baseStyle.content}>
          <View style={sty.inputBox}>
            <TextInputLayout
              hintColor={hintColor}
              focusColor={iconRightFontColor}
              style={sty.inputLayout}>
              <TextInput
                defaultValue={form.projectName}
                value={form.projectName}
                style={sty.textInput}
                placeholder={'项目名称'}
                onChange={e => {
                  this.setParams('projectName', e.nativeEvent.text);
                }}
              />
            </TextInputLayout>
            <Iconright color={iconRightFontColor} style={sty.Iconright} />
          </View>
          <View style={sty.inputBox}>
            <View>
              <Text style={[baseStyle.textGray, baseStyle.ft12]}>项目时间</Text>
              <View style={[baseStyle.row, baseStyle.paddingTop]}>
                <TouchableOpacity
                  onPress={() => {
                    this.datePickerRef.open({
                      value: form.projectStart,
                      key: 'projectStart',
                    });
                  }}>
                  <Text style={baseStyle.ft15}>
                    {this.getTime(form.projectStart)}
                  </Text>
                </TouchableOpacity>
                <Text
                  style={[
                    baseStyle.ft15,
                    baseStyle.paddingLeft,
                    baseStyle.paddingRight,
                  ]}>
                  -
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    this.datePickerRef.open({
                      value: form.projectEnd,
                      type: 'endTime',
                      key: 'projectEnd',
                    });
                  }}>
                  <Text style={baseStyle.ft15}>
                    {this.getTime(form.projectEnd)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Iconright color={iconRightFontColor} style={sty.Iconright} />
          </View>
          <View style={sty.inputBox}>
            <TextInputLayout
              hintColor={hintColor}
              focusColor={iconRightFontColor}
              style={sty.inputLayout}>
              <TextInput
                defaultValue={form.projectDesc}
                value={form.projectDesc}
                onChange={e => {
                  this.setParams('projectDesc', e.nativeEvent.text);
                }}
                style={sty.multiTextInput}
                placeholder={'项目描述'}
                multiline
              />
            </TextInputLayout>
            <Iconright color={iconRightFontColor} style={sty.Iconright} />
          </View>
        </ScrollView>
        <DatePicker
          ref={res => {
            this.datePickerRef = res;
          }}
          type="month"
          rightCallback={({date, key}) => {
            this.setParams(key, date);
          }}
        />
      </View>
    );
  }
}

export default WorkExperience;
const sty = StyleSheet.create({
  authorImg: {
    width: 44,
    height: 44,
  },
  flexContentBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inforItem: {
    // paddingTop: 10,
    paddingBottom: 10,
    // height: 50,
    borderBottomColor: '#E8E7E7',
    borderBottomWidth: 1,
  },
  multiTextInput: {
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#333',
  },
  textInput: {
    fontSize: 16,
    height: 40,
    // paddingTop: 10,
    // paddingBottom: 10,
    color: '#333',
  },
  inputLayout: {
    color: '#000',
    borderBottomColor: '#E8E7E7',
  },
  Iconright: {
    position: 'absolute',
    right: 0,
    bottom: 10,
  },
  inputBox: {
    position: 'relative',
    paddingTop: 10,
  },
});
