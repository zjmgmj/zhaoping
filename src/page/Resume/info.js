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
      sexList: [{label: '男', value: 1}, {label: '女', value: 2}],
      info: {
        userPic: '',
        userRealname: '',
        userSex: 0,
        birthdate: '',
        sex: 2,
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
  saveInfo() {
    const params = {
      birthdate: null,
      cityId: 0,
      housekeeperIs: 0,
      housekeeperStatus: 0,
      housekeeperTitle: 'string',
      latitude: 0,
      longitude: 0,
      provinceId: 0,
      skillDesc: 'string',
      skillLabel: 'string',
      userAccount: 0,
      userCard: 'string',
      userCardFanpic: 'string',
      userCardPic: 'string',
      userDate: '2020-04-16T12:00:15.698Z',
      userId: 0,
      userIntroduction: 'string',
      userLogin: 'string',
      userNickname: 'string',
      userPassword: 'string',
      userPic: 'string',
      userRealname: 'string',
      userRegion: 0,
      userSex: 0,
      userType: 0,
    };
    global.httpPost('user/update', params, res => {
      console.log(res);
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
            console.log('保存');
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
              this.dateModal.open();
            }}
            style={sty.inputBox}>
            <TextInputLayout
              hintColor={hintColor}
              focusColor={iconRightFontColor}
              style={sty.inputLayout}>
              <TextInput
                defaultValue="2014.6"
                style={sty.textInput}
                placeholder={'参加工作时间'}
                editable={false}
              />
            </TextInputLayout>
            <Iconright color={iconRightFontColor} style={sty.Iconright} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.dateModal.open();
            }}
            style={sty.inputBox}>
            <TextInputLayout
              hintColor={hintColor}
              focusColor={iconRightFontColor}
              style={sty.inputLayout}>
              <TextInput
                defaultValue="1992.9"
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
                defaultValue="1896773456"
                style={sty.textInput}
                placeholder={'手机号码'}
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
                defaultValue="89986799@qq.com"
                style={sty.textInput}
                placeholder={'电子邮箱'}
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
                defaultValue="zu178678990"
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
          cancelable={true}>
          <View style={{paddingVertical: 15}}>
            <Datepicker
              style={{paddingHorizontal: 50}}
              proportion={[1, 1, 1]}
              startYear={2010}
              numberOfYears={10}
              date={this.state.birthdate}
              onChange={value => {
                console.log(value);
                this.setState({
                  birthdate: value,
                });
              }}
            />
          </View>
          {this.renderSafeArea()}
        </BottomModal>
        <BottomModal
          ref={c => {
            this.sexModal = c;
          }}
          title="请选择"
          rightCallback={() => {
            this.setParams('sex', this.state.pickerVal.value);
          }}
          cancelable={true}>
          <View style={{paddingVertical: 15}}>
            <Scrollpicker
              style={{paddingHorizontal: 0}}
              list={[this.state.sexList]}
              onChange={data => {
                this.setState({
                  pickerVal: data,
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
