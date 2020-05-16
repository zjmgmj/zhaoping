import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  // SafeAreaView,
} from 'react-native';
import {TextInputLayout} from 'rn-textinputlayout';
import Header from '../../components/Header';
import {setStatusBar} from '../../components/setStatusBar';
import {baseStyle} from '../../components/baseStyle';
import {Iconright} from '../../iconfont/Iconright';
import {Button} from 'beeshell/dist/components/Button';
// import Video from 'react-native-video';

// import Datepicker from 'beeshell/dist/components/Datepicker';
import {
  Scrollpicker,
  Datepicker,
  TopviewGetInstance,
  BottomModal,
} from 'beeshell';
import {selectPhotoTapped} from '../../components/SelectPhotoTapped';
import Picker from '../../components/picker';
// import Loading from './Loading';

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
        pic: '',
        birthDate: new Date().getTime(),
        workingDate: new Date().getTime(),
        phone: '',
        wechat: '',
        sex: 2,
        userId: null,
      },
      currentUser: null,
    };
  }
  UNSAFE_componentWillMount() {
    if (this.props.navigation.getParam('from') === 'mine') {
      global.localStorage.get({key: 'currentUser'}).then(res => {
        console.log(res);
        res.workingDate = res.workingDate ? Number(res.workingDate) : '';
        res.birthDate = res.birthDate ? Number(res.birthDate) : '';
        this.setState({
          currentUser: res,
          info: res,
        });
        this.setParams('userId', res.userId);
      });
    } else {
      // Object.assign(this.state.info, this.props.navigation.getParam('data'));
      this.setState({
        info: this.props.navigation.getParam('data'),
      });
      global.localStorage.get({key: 'currentUser'}).then(res => {
        this.setState({
          currentUser: res,
        });
        this.setParams('userId', res.userId);
      });
    }
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
    console.log('saveInfo', params);
    // params.workingDate = params.workingDate.toString();
    // params.birthDate = params.birthDate.toString();
    let url = '';
    if (this.props.navigation.getParam('from') === 'mine') {
      params.userSex = params.sex;
      url = 'user/save';
      if (params.userId) {
        url = 'user/update';
      }
      // params.workingDate = params.workingDate.toString();
      // params.birthDate = params.birthDate.toString();
    } else {
      url = 'resume/save';
      if (params.id) {
        url = 'resume/update';
      }
    }
    console.log('params', params);
    global.httpPost(
      url,
      params,
      res => {
        console.log('resume', res);
        this.props.navigation.state.params.callBack(params);
        this.props.navigation.goBack();
        if (this.props.navigation.getParam('from') === 'mine') {
          const currentUser = Object.assign(this.state.info, params);
          global.localStorage.set({
            key: 'currentUser',
            data: currentUser,
            expires: null,
          });
        }
      },
      err => {
        console.log(err);
      },
    );
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
    return valItem ? valItem.label : null;
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
    if (!this.state.currentUser) {
      return false;
    }
    const isMine = this.props.navigation.getParam('from') === 'mine';
    const info = this.state.info;
    console.log('info', info);
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
                  this.setParams(isMine ? 'userPic' : 'pic', res);
                },
              });
            }}
            style={[sty.flexContentBetween, sty.inforItem]}>
            <Text>头像</Text>
            <View style={baseStyle.authorBox}>
              {info.pic || info.userPic ? (
                <Image
                  style={baseStyle.authorImg}
                  source={{uri: info.pic || info.userPic}}
                />
              ) : (
                <Image
                  style={baseStyle.authorImg}
                  source={require('../../images/author.png')}
                />
              )}
            </View>
          </TouchableOpacity>
          <View style={sty.inputBox}>
            <TextInputLayout
              hintColor={hintColor}
              focusColor={iconRightFontColor}
              style={sty.inputLayout}>
              <TextInput
                value={info.userNickname || info.name}
                style={sty.textInput}
                placeholder={'姓名'}
                onChange={e => {
                  this.setParams(
                    isMine ? 'userNickname' : 'name',
                    e.nativeEvent.text,
                  );
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
          {this.props.navigation.getParam('from') !== 'mine' ? (
            <View>
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
                    // defaultValue={global.date2Str(this.state.info.workingDate)}
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
            </View>
          ) : (
            <View style={sty.inputBox}>
              <TextInputLayout
                hintColor={hintColor}
                focusColor={iconRightFontColor}
                style={sty.inputLayout}>
                <TextInput
                  value={info.userTitle || ''}
                  style={sty.textInput}
                  placeholder={'职位'}
                  onChange={e => {
                    this.setParams('userTitle', e.nativeEvent.text);
                  }}
                />
              </TextInputLayout>
              <Iconright color={iconRightFontColor} style={sty.Iconright} />
            </View>
          )}

          <View style={sty.inputBox}>
            <TextInputLayout
              hintColor={hintColor}
              focusColor={iconRightFontColor}
              style={sty.inputLayout}>
              <TextInput
                value={info.userLogin || info.phone}
                style={sty.textInput}
                placeholder={'手机号码'}
                onChange={e => {
                  this.setParams(
                    isMine ? 'userLogin' : 'phone',
                    e.nativeEvent.text,
                  );
                }}
              />
            </TextInputLayout>
            <Iconright color={iconRightFontColor} style={sty.Iconright} />
          </View>
          {this.props.navigation.getParam('from') !== 'mine' ? (
            <View>
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
            </View>
          ) : (
            <View>
              <View style={sty.inputBox}>
                <TextInputLayout
                  hintColor={hintColor}
                  focusColor={iconRightFontColor}
                  style={sty.inputLayout}>
                  <TextInput
                    value={info.userIntroduction}
                    multiline={true}
                    onChange={e => {
                      this.setParams('userIntroduction', e.nativeEvent.text);
                    }}
                    style={sty.textInput}
                    placeholder={'个人信息'}
                  />
                </TextInputLayout>
                <Iconright color={iconRightFontColor} style={sty.Iconright} />
              </View>
              <View style={{paddingTop: 20}}>
                <Text>个人介绍视频</Text>
                {info.video ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      flex: 1,
                      marginTop: 10,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        // console.log('ResumeVideo');
                        // this.props.navigation.navigate('ResumeVideo');
                      }}>
                      <ImageBackground
                        source={require('../../images/person_info_bg.png')}
                        style={{
                          width: 322.5,
                          height: 187.5,
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            flex: 1,
                          }}>
                          <Image
                            source={require('../../images/play_icon.png')}
                            style={{width: 64, height: 64}}
                          />
                        </View>
                      </ImageBackground>
                    </TouchableOpacity>
                    {/* <Video
                      source={{uri: info.video}} // Can be a URL or a local file.
                      ref={ref => {
                        this.player = ref;
                      }} // Store reference
                      // onBuffer={this.onBuffer} // Callback when remote video is buffering
                      // onError={this.videoError} // Callback when video cannot be loaded
                      style={sty.backgroundVideo}
                    /> */}
                  </View>
                ) : (
                  <Text style={[sty.textInput, {paddingTop: 10}]}>
                    请上传视频
                  </Text>
                )}
                <Button
                  onPress={() => {
                    selectPhotoTapped({
                      me: this,
                      options: {
                        takePhotoButtonTitle: '拍摄',
                        chooseFromLibraryButtonTitle: '选择视频',
                        mediaType: 'video',
                      },
                      cb: res => {
                        this.setParams('video', res);
                      },
                    });
                  }}
                  style={[sty.subBtn, {backgroundColor: '#D9B06F'}]}
                  textStyle={{color: '#fff'}}>
                  {info.video ? '重新上传视频介绍' : '上传视频'}
                </Button>
              </View>
            </View>
          )}
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
    resizeMode: 'cover',
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
  subBtn: {
    height: 40,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
    marginBottom: 40,
    borderRadius: 3,
  },
});
