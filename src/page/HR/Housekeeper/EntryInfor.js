import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  // SafeAreaView,
} from 'react-native';
import {TextInputLayout} from 'rn-textinputlayout';
import Header from '../../../components/Header';
import {setStatusBar} from '../../../components/setStatusBar';
import {baseStyle} from '../../../components/baseStyle';
import {Iconright} from '../../../iconfont/Iconright';
import {Button} from 'beeshell/dist/components/Button';
// import Datepicker from 'beeshell/dist/components/Datepicker';
import {
  Scrollpicker,
  Datepicker,
  TopviewGetInstance,
  BottomModal,
} from 'beeshell';
import {selectPhotoTapped} from '../../../components/SelectPhotoTapped';
import Picker from '../../../components/picker';
import {Iconadd} from '../../../iconfont/Iconadd';
import {Iconedit} from '../../../iconfont/Iconedit';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class EntryInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sexList: [{label: '男', value: 1}, {label: '女', value: 2}],
      info: {},
      currentUser: null,
      params: {
        skillDesc: '',
        skillLabel: '',
        housekeeperStatus: 1,
      },
    };
  }
  UNSAFE_componentWillMount() {
    global.localStorage.get({key: 'currentUser'}).then(res => {
      console.log(res);
      res.workingDate = res.workingDate ? Number(res.workingDate) : '';
      res.birthDate = res.birthDate ? Number(res.birthDate) : '';
      this.setState({
        currentUser: res,
        info: res,
      });
      this.setParams(res.userId, 'userId');
    });
  }
  getUserInfo() {}
  save() {
    debugger;
    console.log('this.state.params', this.state.params);
    global.httpPost('user/update', this.state.params, res => {
      console.log(res);
      Alert.alert('提示', '审核中');
      this.props.navigation.goBack();
    });
  }
  setParams(value, key) {
    const params = this.state.params;
    params[key] = value;
    this.setState({
      params: params,
    });
  }
  getSexStr() {
    const valItem = this.state.sexList.find(item => {
      return item.value === this.state.info.sex;
    });
    return valItem ? valItem.label : '';
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
    if (!this.state.currentUser) {
      return false;
    }
    const {info, params} = this.state;
    console.log('info', info);
    let labels = [];
    if (params.skillLabel) {
      labels = params.skillLabel.split(',');
    }
    return (
      <View style={[baseStyle.bgWhite, {flex: 1}]}>
        <Header
          title="专属管家信息录入"
          right="保存"
          fullScreen
          onRightPress={() => {
            this.save();
          }}
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <ScrollView style={baseStyle.content}>
          <View style={[sty.flexContentBetween, sty.inforItem]}>
            <Text>头像</Text>
            <Image style={sty.authorImg} source={{uri: info.userPic}} />
          </View>
          <View
            style={[
              baseStyle.row,
              baseStyle.justifyBetween,
              baseStyle.borderBottom,
              sty.inputBox,
            ]}>
            <Text>姓名</Text>
            <View style={[baseStyle.row]}>
              <Text style={baseStyle.textYellow}>{info.userNickname}</Text>
              <Iconright color={iconRightFontColor} style={sty.Iconright} />
            </View>
          </View>
          <View
            style={[
              baseStyle.row,
              baseStyle.justifyBetween,
              baseStyle.borderBottom,
              sty.inputBox,
            ]}>
            <Text>性别</Text>
            <View style={[baseStyle.row]}>
              <Text style={baseStyle.textYellow}>{this.getSexStr()}</Text>
              <Iconright color={iconRightFontColor} style={sty.Iconright} />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('SkillDesc', {
                callBack: res => {
                  this.setParams(res, 'skillDesc');
                },
              });
            }}
            style={sty.inforItem}>
            <View
              style={[
                sty.flexContentBetween,
                baseStyle.paddingBottom,
                {flex: 1},
              ]}>
              <Text>职业技能</Text>
              <Iconedit />
            </View>
            <Text style={[baseStyle.textGray, baseStyle.paddingTop]}>
              {params.skillDesc || '请输入职业技能'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('SkillTags', {
                labels: this.state.params.skillLabel,
                callBack: res => {
                  console.log('callBack', res);
                  this.setParams(res.labels, 'skillLabel');
                },
              });
            }}
            style={sty.inforItem}>
            <View style={sty.flexContentBetween}>
              <Text>技能标签</Text>
              <Iconedit />
            </View>
            <View style={[baseStyle.row, baseStyle.paddingTop]}>
              {labels.length > 0 ? (
                labels.map((item, idx) => {
                  return (
                    <View
                      key={idx}
                      style={{
                        borderColor: '#999999',
                        borderWidth: 0.5,
                        padding: 5,
                        marginRight: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text style={[{marginRight: 5}, baseStyle.textGray]}>
                        {item}
                      </Text>
                    </View>
                  );
                })
              ) : (
                <View style={baseStyle.row}>
                  <Button
                    onPress={() => {
                      this.props.navigation.navigate('SkillTags', {
                        labels: this.state.params.skillLabel,
                        callBack: res => {
                          console.log('callBack', res);
                          this.setParams(res.labels, 'skillLabel');
                        },
                      });
                    }}
                    size="sm"
                    style={{borderColor: '#999999', marginRight: 10}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={[{marginRight: 5}, baseStyle.textGray]}>
                        添加标签
                      </Text>
                      <Iconadd />
                    </View>
                  </Button>
                  <Text style={baseStyle.textGray}>定义你的个性化标签</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
          <View style={(baseStyle.row, {justifyContent: 'center'})}>
            <Button
              onPress={() => {
                this.save();
              }}
              style={[sty.subBtn, {backgroundColor: '#D9B06F'}]}
              textStyle={{color: '#fff'}}>
              保存
            </Button>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default EntryInfor;
const sty = StyleSheet.create({
  subBtn: {
    height: 40,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 50,
    marginBottom: 40,
    borderRadius: 3,
  },
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
    paddingTop: 10,
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
    // position: 'absolute',
    // right: 0,
    // bottom: 10,
  },
  inputBox: {
    position: 'relative',
    paddingTop: 20,
    paddingBottom: 20,
  },
});
