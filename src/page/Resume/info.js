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
import {
  Scrollpicker,
  Datepicker,
  TopviewGetInstance,
  BottomModal,
} from 'beeshell';
import {selectPhotoTapped} from '../../components/SelectPhotoTapped';
import Picker from '../../components/picker';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class ResumeInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerVal: null,
      pickDate: '',
      pickKey: '',
      sexList: [{label: '男', value: 1}, {label: '女', value: 2}],
      info: {
        userPic: '',
        userSex: 0,
        birthDate: new Date().getTime(),
        workingDate: new Date().getTime(),
        sex: 2,
        phone: '',
        wechat: '',
        userId: null,
      },
      currentUser: null,
    };
  }
  UNSAFE_componentWillMount() {
    this.setState({
      info: this.props.navigation.getParam('data'),
    });
    global.localStorage.get({key: 'currentUser'}).then(res => {
      console.log(res);
      this.setState({
        currentUser: res,
      });
      this.setParams('userId', res.userId);
    });
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
  saveInfo() {
    const params = this.state.info;
    params.workdate = new Date(params.workingDate).getFullYear();
    const workdateTime = new Date(params.workingDate).getTime();
    const nowDate = new Date().getTime();
    const date = nowDate - workdateTime;
    const year = parseInt(date / 1000 / 60 / 60 / 24 / 365);
    params.workyear = year;
    console.log(params);
    let url = 'user/save';
    if (params.id) {
      url = 'user/update';
    }
    global.httpPost(url, params, res => {
      console.log('resume', res);
      params.id = res.data;
      this.props.navigation.state.params.callBack(params);
      this.props.navigation.goBack();
    });
  }
  setParams(key, value) {
    const params = this.state.info;
    params[key] = value;
    this.setState({
      info: params,
    });
  }
  getSexStr() {
    const valItem = this.state.sexList.find(item => {
      return item.value === this.state.info.sex;
    });
    return valItem.label;
  }
  openPicked({list, key, valueKey}) {
    TopviewGetInstance()
      .add(
        <Picker
          list={list}
          labelKey="label"
          valueKey={valueKey}
          selected={this.state.info[key]}
          close={() => {
            TopviewGetInstance().remove(this.state.pickId);
          }}
          selectedEvent={item => {
            const info = this.state.info;
            info[key] = item[valueKey];
            this.setState({
              info: info,
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
    const hintColor = '#333';
    const info = this.state.info;
    return (
      <View style={[baseStyle.bgWhite, {flex: 1}]}>
        <Header
          title="个人信息"
          right="保存"
          fullScreen
          onRightPress={() => {
            this.saveInfo();
          }}
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <ScrollView style={baseStyle.content}>
          <TouchableOpacity
            onPress={() => {
              selectPhotoTapped({
                me: this,
                cb: res => {
                  this.setParams('pic', res);
                },
              });
            }}
            style={[sty.flexContentBetween, sty.inforItem]}>
            <Text>头像</Text>
            {info.pic ? (
              <Image style={sty.authorImg} source={{uri: info.pic}} />
            ) : (
              <Image
                style={sty.authorImg}
                source={require('../../images/author.png')}
              />
            )}
          </TouchableOpacity>
          <View style={sty.inputBox}>
            <TextInputLayout
              hintColor={hintColor}
              focusColor={iconRightFontColor}
              style={sty.inputLayout}>
              <TextInput
                defaultValue={info.name}
                value={info.name}
                style={sty.textInput}
                placeholder={'姓名'}
                onChange={e => {
                  this.setParams('name', e.nativeEvent.text);
                }}
              />
            </TextInputLayout>
            <Iconright color={iconRightFontColor} style={sty.Iconright} />
          </View>
          <TouchableOpacity
            onPress={() => {
              this.openPicked({
                list: this.state.sexList,
                key: 'sex',
                valueKey: 'value',
              });
            }}
            style={sty.inputBox}>
            <TextInputLayout
              hintColor={hintColor}
              focusColor={iconRightFontColor}
              style={sty.inputLayout}>
              <TextInput
                defaultValue={this.getSexStr()}
                value={this.getSexStr()}
                style={sty.textInput}
                placeholder={'性别'}
                editable={false}
              />
            </TextInputLayout>
            <Iconright color={iconRightFontColor} style={sty.Iconright} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                pickDate: global.date2Str(this.state.info.workingDate),
                pickKey: 'workingDate',
              });
              this.dateModal.open();
            }}
            style={sty.inputBox}>
            <TextInputLayout
              hintColor={hintColor}
              focusColor={iconRightFontColor}
              style={sty.inputLayout}>
              <TextInput
                value={global.date2Str(this.state.info.workingDate)}
                defaultValue={global.date2Str(this.state.info.workingDate)}
                style={sty.textInput}
                placeholder={'参加工作时间'}
                editable={false}
              />
            </TextInputLayout>
            <Iconright color={iconRightFontColor} style={sty.Iconright} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                pickDate: global.date2Str(this.state.info.birthDate),
                pickKey: 'birthDate',
              });
              this.dateModal.open();
            }}
            style={sty.inputBox}>
            <TextInputLayout
              hintColor={hintColor}
              focusColor={iconRightFontColor}
              style={sty.inputLayout}>
              <TextInput
                value={global.date2Str(this.state.info.birthDate)}
                defaultValue={global.date2Str(this.state.info.birthDate)}
                style={sty.textInput}
                placeholder={'出生年月'}
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
                defaultValue={info.phone}
                value={info.phone}
                style={sty.textInput}
                placeholder={'手机号码'}
                onChange={e => {
                  this.setParams('phone', e.nativeEvent.text);
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
                defaultValue={info.email}
                value={info.email}
                style={sty.textInput}
                placeholder={'电子邮箱'}
                onChange={e => {
                  this.setParams('email', e.nativeEvent.text);
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
                defaultValue={info.wechat}
                value={info.wechat}
                onChange={e => {
                  this.setParams('wechat', e.nativeEvent.text);
                }}
                style={sty.textInput}
                placeholder={'微信号码'}
              />
            </TextInputLayout>
            <Iconright color={iconRightFontColor} style={sty.Iconright} />
          </View>
        </ScrollView>
        <BottomModal
          ref={c => {
            this.dateModal = c;
          }}
          title="请选择日期"
          rightCallback={() => {
            if (this.state.pickDate) {
              const nowDate = this.state.pickDate.split('-');
              const oldDate = global.date2Str(
                new Date(this.state.info.pickDate),
              );
              const oldDateList = oldDate.split('/');
              nowDate.map((item, idx) => {
                if (item) {
                  oldDateList[idx] = item;
                }
              });
              this.setParams(
                this.state.pickKey,
                new Date(oldDateList.toString().replace(/,/g, '/')).getTime(),
              );
            }
          }}
          cancelable={true}>
          <View style={{paddingVertical: 15}}>
            <Datepicker
              style={{paddingHorizontal: 50}}
              proportion={[1, 1, 1]}
              startYear={1992}
              numberOfYears={50}
              date={this.state.pickDate}
              onChange={value => {
                this.setState({
                  pickDate: value,
                });
              }}
            />
          </View>
          {this.renderSafeArea()}
        </BottomModal>
      </View>
    );
  }
}

export default ResumeInfo;
const sty = StyleSheet.create({
  authorImg: {
    width: 44,
    height: 44,
    borderRadius: 100,
    resizeMode: 'contain',
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
  textInput: {
    fontSize: 16,
    height: 40,
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
