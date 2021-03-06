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
import {TextInputLayout} from 'rn-textinputlayout';
import Header from '../../components/Header';
import {setStatusBar} from '../../components/setStatusBar';
import {baseStyle} from '../../components/baseStyle';
import {Iconright} from '../../iconfont/Iconright';
// import Datepicker from 'beeshell/dist/components/Datepicker';
import {TopviewGetInstance} from 'beeshell';
import DatePicker from '../../components/DatePicker';
import Picker from '../../components/picker';
import {Button} from 'beeshell/dist/components/Button';

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
        companyName: '',
        depName: '',
        jobDesc: '',
        // monthlySalary: 0,
        salaryId: 0,
        salaryName: '',
        positionName: '',
        servicetimeEnd: new Date(),
        servicetimeIs: 0,
        servicetimeStart: new Date(),
        resumeId: this.props.navigation.getParam('resumeId'),
      },
      id: this.props.navigation.getParam('id'),
    };
  }
  UNSAFE_componentWillMount() {
    global.gettypelist('salary', res => {
      // 年薪
      console.log('salaryList', res.data);
      this.setState({
        salaryList: res.data,
      });
    });
    if (!this.props.navigation.getParam('type')) {
      this.getDetail();
    }
    if (this.props.navigation.getParam('item')) {
      this.setState({
        form: this.props.navigation.getParam('item'),
      });
    }
    // if (this.props.navigation.getParam('item')) {
    //   this.setState({
    //     form: this.props.navigation.getParam('item'),
    //   });
    // } else {
    //   this.getDetail();
    // }
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
  openPicked({list}) {
    TopviewGetInstance()
      .add(
        <Picker
          list={list}
          labelKey={'dvalue'}
          valueKey={'id'}
          selected={this.state.form.salaryId}
          close={() => {
            TopviewGetInstance().remove(this.state.pickId);
          }}
          selectedEvent={item => {
            const form = this.state.form;
            form.salaryId = item.id;
            form.salaryName = item.dvalue;
            form.monthlySalary = item.id;
            // valList
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
  getDetail() {
    global.httpGet('resumeworkexp/detail', {id: this.state.id}, res => {
      console.log('resumeworkexp', res.data);
      const resData = res.data;
      this.setState({
        form: resData,
      });
    });
  }
  delete() {
    global.httpGet('resumeworkexp/delete', {id: this.state.id}, res => {
      console.log(res);
      this.props.navigation.state.params.callBack('delete');
      this.props.navigation.goBack();
    });
  }
  save() {
    let url = 'resumeworkexp/save';
    if (this.state.form.id) {
      url = 'resumeworkexp/update';
    }
    global.httpPost(
      url,
      this.state.form,
      res => {
        const callBack = this.props.navigation.state.params.callBack;
        if (this.state.form.id) {
          callBack('update');
        } else {
          callBack(this.state.form);
        }
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
          title="工作经历"
          right="保存"
          fullScreen
          onRightPress={() => {
            console.log('保存');
            this.save();
          }}
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <View
          style={[baseStyle.content, {height: baseStyle.screenHeight - 30}]}>
          <View style={sty.inputBox}>
            <TextInputLayout
              hintColor={hintColor}
              focusColor={iconRightFontColor}
              style={sty.inputLayout}>
              <TextInput
                value={form.companyName || ''}
                style={sty.textInput}
                placeholder={'公司名称'}
                onChange={e => {
                  this.setParams('companyName', e.nativeEvent.text);
                }}
              />
            </TextInputLayout>
            <Iconright color={iconRightFontColor} style={sty.Iconright} />
          </View>
          <View style={sty.inputBox}>
            <TextInputLayout
              hintColor={hintColor}
              focusColor={iconRightFontColor}
              style={sty.inputLayout}>
              <TextInput
                value={form.positionName || ''}
                style={sty.textInput}
                placeholder={'职位名称'}
                onChange={e => {
                  this.setParams('positionName', e.nativeEvent.text);
                }}
              />
            </TextInputLayout>
            <Iconright color={iconRightFontColor} style={sty.Iconright} />
          </View>
          <View style={sty.inputBox}>
            <TextInputLayout
              hintColor={hintColor}
              focusColor={iconRightFontColor}
              style={sty.inputLayout}>
              <TextInput
                value={form.depName || ''}
                onChange={e => {
                  this.setParams('depName', e.nativeEvent.text);
                }}
                style={sty.textInput}
                placeholder={'所属部门'}
              />
            </TextInputLayout>
            <Iconright color={iconRightFontColor} style={sty.Iconright} />
          </View>
          <View style={sty.inputBox}>
            <View>
              <Text style={[baseStyle.textGray, baseStyle.ft12]}>在职时间</Text>
              <View style={[baseStyle.row, baseStyle.paddingTop]}>
                <TouchableOpacity
                  onPress={() => {
                    this.datePickerRef.open({
                      value: form.servicetimeStart,
                      key: 'servicetimeStart',
                    });
                  }}>
                  <Text style={baseStyle.ft15}>
                    {this.getTime(form.servicetimeStart)}
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
                      value: form.servicetimeEnd,
                      type: 'endTime',
                      key: 'servicetimeEnd',
                    });
                  }}>
                  <Text style={baseStyle.ft15}>
                    {this.getTime(form.servicetimeEnd)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Iconright color={iconRightFontColor} style={sty.Iconright} />
          </View>
          <TouchableOpacity
            onPress={() => {
              this.openPicked({
                list: this.state.salaryList,
              });
            }}
            style={sty.inputBox}>
            <TextInputLayout
              hintColor={hintColor}
              focusColor={iconRightFontColor}
              style={sty.inputLayout}>
              <TextInput
                value={this.state.form.salaryName}
                style={sty.textInput}
                placeholder={'年薪'}
                editable={false}
              />
            </TextInputLayout>
            <Iconright color={iconRightFontColor} style={sty.Iconright} />
          </TouchableOpacity>
          <View style={sty.inputBox}>
            <TextInputLayout
              hintColor={hintColor}
              focusColor={iconRightFontColor}
              style={sty.inputLayout}>
              <TextInput
                defaultValue={form.jobDesc}
                value={form.jobDesc}
                onChange={e => {
                  this.setParams('jobDesc', e.nativeEvent.text);
                }}
                style={sty.multiTextInput}
                placeholder={'工作描述'}
                multiline
              />
            </TextInputLayout>
            <Iconright color={iconRightFontColor} style={sty.Iconright} />
          </View>
          {form.id ? (
            <View style={baseStyle.footBtnRel}>
              <View style={[baseStyle.row, {marginTop: 20, marginBottom: 20}]}>
                <Button
                  onPress={() => {
                    this.delete();
                  }}
                  style={[
                    sty.subBtn,
                    {
                      flex: 1,
                      borderColor: '#D9B06F',
                      backgroundColor: '#FBF8F2',
                      borderWidth: 0.5,
                    },
                  ]}
                  textStyle={{color: '#D9B06F'}}>
                  删除
                </Button>
                <Button
                  onPress={() => {
                    this.save();
                  }}
                  style={[sty.subBtn, {flex: 1, backgroundColor: '#D9B06F'}]}
                  textStyle={{color: '#fff'}}>
                  完成
                </Button>
              </View>
            </View>
          ) : null}
        </View>
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
  subBtn: {
    width: 140,
    paddingLeft: 0,
    paddingRight: 0,
    height: 40,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 3,
  },
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
