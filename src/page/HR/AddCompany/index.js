import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  // SafeAreaView,
} from 'react-native';
import {Button} from 'beeshell/dist/components/Button';
import Header from '../../../components/Header';
import {setStatusBar} from '../../../components/setStatusBar';
import {baseStyle} from '../../../components/baseStyle';
import {Iconright} from '../../../iconfont/Iconright';
import Picker from '../../../components/picker';
import {TopviewGetInstance} from 'beeshell';
import {selectPhotoTapped} from '../../../components/SelectPhotoTapped';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class PostPosition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        // account: '',
        address: '',
        cityId: 0,
        cityName: '',
        companySize: 0,
        companySizeName: '',
        contacts: '',
        contactsPhone: '',
        defaultis: 0,
        financingStage: 0,
        financingStageName: '',
        // latitude: 0
        // longitude: 0
        legalPerson: '',
        logo: '',
        mapAddress: '',
        name: '',
        openingInstitution: '',
        provinceId: '',
        regionId: 0,
        regionName: '',
        // status: 0
        // type: 0
        unitPic: '',
        unitQualification: 0,
        unitQualificationName: '',
        urls: '',
        userId: null,
      },
      companySizeList: [],
      financingStageList: [],
      unitQualificationList: [],
    };
  }
  UNSAFE_componentWillMount() {
    const positionParams = this.state.params;
    global.localStorage.get({key: 'currentUser'}).then(res => {
      positionParams.userId = res.userId;
      positionParams.userNickname = res.userNickname;
      this.setState({
        params: positionParams,
      });
    });
    global.gettypelist('companySize', res => {
      // 公司规模
      this.setState({
        companySizeList: res.data,
      });
    });
    global.gettypelist('financingStage', res => {
      // 融资阶段
      this.setState({
        financingStageList: res.data,
      });
    });
    global.gettypelist('unitQualification', res => {
      // 单位资质
      this.setState({
        unitQualificationList: res.data,
      });
    });
    debugger;
    const id = this.props.navigation.getParam('id');
    console.log('id', id);
    if (id) {
      this.getCompanyDetail(id);
    }
  }
  getCompanyDetail(id) {
    global.httpGet(
      'company/detail',
      {id: id},
      res => {
        console.log('companyDetail', res);
        this.setState({
          params: res.data,
        });
      },
      err => {
        console.log(err);
      },
    );
  }
  savePosition() {
    const params = this.state.params;
    let url = 'company/save';
    if (this.state.params.id) {
      url = 'company/update';
    }
    global.httpPost(url, params, res => {
      if (res.code === 1) {
        this.props.navigation.state.params.callBack();
        this.props.navigation.goBack();
      }
    });
  }
  setParams(val, key) {
    const params = this.state.params;
    params[key] = val;
    this.setState({
      params: params,
    });
  }
  openPicked(list, objKey) {
    list.map(item => {
      item.active = false;
      item.label = item.dvalue;
    });
    TopviewGetInstance()
      .add(
        <Picker
          list={list}
          selected={this.state.params.experienceId}
          close={() => {
            TopviewGetInstance().remove(this.state.pickId);
          }}
          selectedEvent={item => {
            const params = this.state.params;
            Object.keys(objKey).forEach(key => {
              params[objKey[key]] = item[key];
            });
            // params[`${key}Name`] = item.dvalue;
            // params[`${key}Id`] = item.id;
            this.setState({
              params: params,
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
    const iconRightFontColor = '#D6D0D0';
    return (
      <View style={[baseStyle.bgWhite, {flex: 1}]}>
        <Header
          title="企业信息"
          fullScreen
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <ScrollView style={baseStyle.content}>
          <View style={[baseStyle.borderBottom, sty.inputBox]}>
            <Text>单位名称</Text>
            <View style={[baseStyle.row]}>
              <TextInput
                placeholder="请输入公司信息"
                style={[baseStyle.textYellow, sty.textInputSty]}
                value={this.state.params.name}
                onChange={e => {
                  this.setParams(e.nativeEvent.text, 'name');
                }}
              />
              <Iconright color={iconRightFontColor} style={sty.Iconright} />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              selectPhotoTapped({
                me: this,
                cb: res => {
                  this.setParams(res, 'logo');
                },
              });
            }}
            style={[baseStyle.borderBottom, sty.inputBox]}>
            <Text>上传公司logo</Text>
            <View style={[baseStyle.row]}>
              {this.state.params.logo ? (
                <Image
                  source={{
                    uri: this.state.params.logo,
                  }}
                  style={{width: 20, height: 20, resizeMode: 'contain'}}
                />
              ) : (
                <Text style={baseStyle.textGray}>请上传</Text>
              )}
              <Iconright color={iconRightFontColor} style={sty.Iconright} />
            </View>
          </TouchableOpacity>
          <View style={[baseStyle.borderBottom, sty.inputBox]}>
            <Text>联系人信息</Text>
            <View style={[baseStyle.row]}>
              <TextInput
                keyboardType="numeric"
                placeholder="请填写"
                style={[baseStyle.textYellow, sty.textInputSty]}
              />
              <Iconright color={iconRightFontColor} style={sty.Iconright} />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.openPicked(this.state.companySizeList, {
                dvalue: 'companySizeName',
                id: 'companySize',
              });
            }}
            style={[baseStyle.borderBottom, sty.inputBox]}>
            <Text>公司规模</Text>
            <View style={[baseStyle.row]}>
              <Text
                style={
                  this.state.params.companySize
                    ? baseStyle.textYellow
                    : baseStyle.textGray
                }>
                {this.state.params.companySizeName || '请选择'}
              </Text>
              <Iconright color={iconRightFontColor} style={sty.Iconright} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.openPicked(this.state.financingStageList, {
                dvalue: 'financingStageName',
                id: 'financingStage',
              });
            }}
            style={[baseStyle.borderBottom, sty.inputBox]}>
            <Text>融资阶段</Text>
            <View style={[baseStyle.row]}>
              <Text
                style={
                  this.state.params.financingStage
                    ? baseStyle.textYellow
                    : baseStyle.textGray
                }>
                {this.state.params.financingStageName || '请选择'}
              </Text>
              <Iconright color={iconRightFontColor} style={sty.Iconright} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.openPicked(this.state.salaryList, 'salary');
            }}
            style={[baseStyle.borderBottom, sty.inputBox]}>
            <Text>公司官网</Text>
            <View style={[baseStyle.row]}>
              <TextInput
                placeholder="请输入"
                style={[baseStyle.textYellow, sty.textInputSty]}
                value={this.state.params.urls}
                onChange={e => {
                  this.setParams(e.nativeEvent.text, 'urls');
                }}
              />
              <Iconright color={iconRightFontColor} style={sty.Iconright} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.openPicked(this.state.unitQualificationList, {
                dvalue: 'unitQualificationName',
                id: 'unitQualification',
              });
            }}
            style={[baseStyle.borderBottom, sty.inputBox]}>
            <Text>单位资质</Text>
            <View style={[baseStyle.row]}>
              <Text
                style={
                  this.state.params.unitQualification
                    ? baseStyle.textYellow
                    : baseStyle.textGray
                }>
                {this.state.params.unitQualificationName || '请选择'}
              </Text>
              <Iconright color={iconRightFontColor} style={sty.Iconright} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              selectPhotoTapped({
                me: this,
                cb: res => {
                  this.setParams(res, 'unitPic');
                },
              });
            }}
            style={[baseStyle.borderBottom, sty.inputBox]}>
            <Text>上传资质文件</Text>
            <View style={[baseStyle.row]}>
              <Text
                style={
                  this.state.params.unitPic
                    ? baseStyle.textYellow
                    : baseStyle.textGray
                }>
                {this.state.params.unitPic ? '已上传' : '请上传'}
              </Text>
              <Iconright color={iconRightFontColor} style={sty.Iconright} />
            </View>
          </TouchableOpacity>
          <Button
            onPress={() => {
              this.savePosition();
            }}
            style={[sty.subBtn, {backgroundColor: '#D9B06F'}]}
            textStyle={{color: '#fff'}}>
            {this.state.params.id ? '保存' : '添加'}
          </Button>
        </ScrollView>
      </View>
    );
  }
}

export default PostPosition;
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
    // position: 'absolute',
    // right: 0,
    // bottom: 10,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingBottom: 15,
  },
  textInputSty: {
    textAlign: 'right',
    width: 300,
    padding: 0,
  },
});
