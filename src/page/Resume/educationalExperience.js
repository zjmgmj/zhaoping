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
import {TopviewGetInstance} from 'beeshell';
import DatePicker from '../../components/DatePicker';
import Picker from '../../components/picker';
import {Button} from 'beeshell/dist/components/Button';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class EducationalExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickId: null,
      date: '',
      educationList: [],
      form: {
        educationId: null,
        schoolName: '',
        schoolEnd: new Date(),
        schoolStart: new Date(),
        resumeId: this.props.navigation.getParam('resumeId'),
        id: this.props.navigation.getParam('id'),
      },
      id: this.props.navigation.getParam('id'),
    };
  }
  UNSAFE_componentWillMount() {
    if (!this.props.navigation.getParam('type')) {
      this.getDetail();
    }
    if (this.props.navigation.getParam('item')) {
      this.setState({
        form: this.props.navigation.getParam('item'),
      });
    }
    global.gettypelist('education', res => {
      // 学历
      console.log('educationList', res.data);
      this.setState({
        educationList: res.data,
      });
      // if (this.props.navigation.getParam('item')) {
      //   this.setState({
      //     form: this.props.navigation.getParam('item'),
      //   });
      // } else {
      //   this.getDetail();
      // }
    });
  }
  openPicked({list, key, valueKey, labelKey = 'label'}) {
    console.log(list);
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
            // form[key] = item[valueKey];
            form.educationName = item[labelKey];
            form.educationId = item[valueKey];
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
  getDetail() {
    global.httpGet('resumeschoolexp/detail', {id: this.state.id}, res => {
      console.log('resumeschoolexp', res.data);
      const resData = res.data;
      this.setState({
        form: resData,
      });
    });
  }
  delete() {
    global.httpGet('resumeschoolexp/delete', {id: this.state.id}, res => {
      console.log(res);
      this.props.navigation.state.params.callBack('delete');
      this.props.navigation.goBack();
    });
  }
  save() {
    let url = 'resumeschoolexp/save';
    if (this.state.form.id) {
      url = 'resumeschoolexp/update';
    }
    global.httpPost(
      url,
      this.state.form,
      res => {
        this.props.navigation.state.params.callBack(this.state.form);
        this.props.navigation.goBack();
      },
      err => {
        console.log(err);
      },
    );
  }
  getEducationName(id) {
    const education = this.state.educationList.find(item => {
      return item.id === id;
    });
    if (education) {
      return education.dvalue;
    } else {
      return '';
    }
  }
  render() {
    const iconRightFontColor = '#D3CECE';
    const form = this.state.form;
    console.log('form', form);
    return (
      <View style={[baseStyle.bgWhite, {flex: 1}]}>
        <Header
          title="教育经历"
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
        <ScrollView style={[baseStyle.content, {flex: 1}]}>
          <View style={sty.inputBox}>
            <View style={{flex: 1}}>
              <Text style={[sty.ftColor, baseStyle.ft12]}>学校名称</Text>
              <TextInput
                defaultValue={form.schoolName}
                value={form.schoolName}
                style={sty.textInput}
                placeholderTextColor="#666666"
                placeholder={'如：清华大学'}
                onChange={e => {
                  form.schoolName = e.nativeEvent.text;
                  this.setState({
                    form: form,
                  });
                }}
              />
            </View>
            <Iconright color={iconRightFontColor} style={sty.Iconright} />
          </View>
          <View style={sty.inputBox}>
            <TouchableOpacity
              onPress={() => {
                this.openPicked({
                  list: this.state.educationList,
                  key: 'educationName',
                  valueKey: 'id',
                  labelKey: 'dvalue',
                });
              }}
              style={{flex: 1}}>
              <Text style={[sty.ftColor, baseStyle.ft12]}>学历</Text>
              <TextInput
                value={this.state.form.educationName}
                style={sty.textInput}
                placeholderTextColor="#666666"
                placeholder={'如：本科'}
                editable={false}
              />
            </TouchableOpacity>
            <Iconright color={iconRightFontColor} style={sty.Iconright} />
          </View>
          <View style={sty.inputBox}>
            <View>
              <Text style={[sty.ftColor, baseStyle.ft12]}>在校时间</Text>
              <View style={[baseStyle.row, baseStyle.paddingTop]}>
                <TouchableOpacity
                  onPress={() => {
                    this.datePickerRef.open({
                      value: form.schoolStart,
                      key: 'schoolStart',
                    });
                  }}>
                  <Text style={baseStyle.ft15}>
                    {this.getTime(form.schoolStart)}
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
                      value: form.schoolEnd,
                      type: 'endTime',
                      key: 'schoolEnd',
                    });
                  }}>
                  <Text style={baseStyle.ft15}>
                    {this.getTime(form.schoolEnd)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Iconright color={iconRightFontColor} style={sty.Iconright} />
          </View>
          {form.id ? (
            <View style={[baseStyle.footBtnRel, {paddingTop: 15}]}>
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
                  保存
                </Button>
              </View>
            </View>
          ) : null}
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

export default EducationalExperience;
const sty = StyleSheet.create({
  subBtn: {
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
    paddingLeft: 0,
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
    borderBottomColor: '#E8E7E7',
    borderBottomWidth: 0.5,
  },
  ftColor: {
    color: '#666',
  },
});
