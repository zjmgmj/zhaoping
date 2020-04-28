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
import {Button} from 'beeshell/dist/components/Button';
import Header from '../../../components/Header';
import {setStatusBar} from '../../../components/setStatusBar';
import {baseStyle} from '../../../components/baseStyle';
import {Iconright} from '../../../iconfont/Iconright';
import Picker from '../../../components/picker';
import {TopviewGetInstance} from 'beeshell';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class PostPosition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: [],
      pickId: null,
      experienceList: [],
      educationList: [],
      salaryList: [],
      companyList: [],
      positionTypeList: [
        {dvalue: '普通职位', id: 1},
        {dvalue: '内推职位', id: 2},
      ],
      params: {
        cityId: 0,
        cityName: '',
        companyId: null,
        companyName: '山东共展信息科技有限公司',
        educationId: 0,
        educationName: '',
        experienceId: 0,
        experienceName: '',
        isrecommend: 1,
        labels: '',
        positionBenefits: '',
        positionClass: null,
        positionDesc: '',
        positionName: '',
        positionRequirements: '',
        positionTypeName: '内推职位',
        positionTypeId: 2,
        positionType: 2, // 1=普通职位 2=内推职位
        provinceId: 0,
        regionId: 0,
        regionName: '',
        salaryId: 0,
        userId: '',
        userNickname: '',
        userPic: '',
        userTitle: '',
        workAddress: '',
      },
    };
  }
  UNSAFE_componentWillMount() {
    const positionParams = this.state.params;
    global.localStorage.get({key: 'currentUser'}).then(res => {
      positionParams.userId = res.userId;
      positionParams.userNickname = res.userNickname;
      this.getCompanyList();
      this.setState({
        params: positionParams,
      });
    });
    global.gettypelist('experience', res => {
      // 经验要求
      this.setState({
        experienceList: res.data,
      });
    });
    global.gettypelist('education', res => {
      // 学历
      this.setState({
        educationList: res.data,
      });
    });
    global.gettypelist('salary', res => {
      // 年薪
      this.setState({
        salaryList: res.data,
      });
    });
  }
  componentDidMount() {
    this.getRegion();
  }
  getCompanyList() {
    const positionParams = this.state.params;
    global.httpGet(
      'company/list',
      {
        page: 1,
        size: 100,
        userId: positionParams.userId,
      },
      res => {
        // 公司列表
        console.log('公司列表', res);
        this.setState({
          companyList: res.data.result,
        });
      },
      err => {
        console.log(err);
      },
    );
  }
  getRegion() {
    global.httpGet(
      'region/getregionlist',
      {pid: 1001000000},
      res => {
        console.log('getregionlist', res);
      },
      err => {
        console.log(err);
      },
    );
  }
  savePosition() {
    const params = this.state.params;
    params.positionType = params.positionTypeId;
    delete params.salaryName;
    delete params.positionTypeName;
    delete params.positionTypeId;
    params.positionBenefits = params.positionBenefits.toString();
    console.log(JSON.stringify(params));
    global.httpPost('position/save', params, res => {
      console.log(res);
    });
  }
  setParams(val, key) {
    const params = this.state.params;
    params[key] = val;
    this.setState({
      params: params,
    });
  }
  openPicked(list, key, labelKey = 'dvalue', valKey = 'id') {
    list.map(item => {
      item.active = false;
      item.label = item[labelKey];
    });
    console.log('list', list.label);
    TopviewGetInstance()
      .add(
        <Picker
          list={list}
          labelKey={labelKey}
          selected={this.state.params[`${key}Id`]}
          close={() => {
            TopviewGetInstance().remove(this.state.pickId);
          }}
          selectedEvent={item => {
            const params = this.state.params;
            params[`${key}Name`] = item[labelKey];
            params[`${key}Id`] = item[valKey];
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
          title="发布职位"
          fullScreen
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <ScrollView style={baseStyle.content}>
          <TouchableOpacity
            onPress={() => {
              this.openPicked(this.state.positionTypeList, 'positionType');
            }}
            style={[baseStyle.borderBottom, sty.inputBox]}>
            <Text>职位类型</Text>
            <View style={[baseStyle.row]}>
              {/* <TextInput style={[baseStyle.textYellow, sty.textInputSty]}>
                内推职位
              </TextInput> */}
              <Text
                style={
                  this.state.params.positionTypeName
                    ? baseStyle.textYellow
                    : baseStyle.textGray
                }>
                {this.state.params.positionTypeName || '请选择'}
              </Text>
              {/* <Text style={baseStyle.textYellow}>内推职位</Text> */}
              <Iconright color={iconRightFontColor} style={sty.Iconright} />
            </View>
          </TouchableOpacity>
          {/* {/* <View style={[baseStyle.borderBottom, sty.inputBox]}>
            <Text>公司信息</Text>
            <View style={[baseStyle.row]}>
              <TextInput
                placeholder="请输入公司信息"
                style={[baseStyle.textYellow, sty.textInputSty]}>
                山东共展信息科技有限公司
              </TextInput>
              <Iconright color={iconRightFontColor} style={sty.Iconright} />
            </View>
            </View> */}
          <TouchableOpacity
            onPress={() => {
              this.openPicked(this.state.companyList, 'company', 'name');
            }}
            style={[baseStyle.borderBottom, sty.inputBox]}>
            <Text>公司信息</Text>
            <View style={[baseStyle.row]}>
              <Text
                style={
                  this.state.params.salaryId
                    ? baseStyle.textYellow
                    : baseStyle.textGray
                }>
                {this.state.params.companyName || '请选择'}
              </Text>
              <Iconright color={iconRightFontColor} style={sty.Iconright} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('PositionName', {
                callBack: res => {
                  this.setParams(res.positionName, 'positionName');
                },
              });
            }}
            style={[baseStyle.borderBottom, sty.inputBox]}>
            <Text>职位名称</Text>
            <View style={[baseStyle.row]}>
              <Text
                style={
                  this.state.params.positionName
                    ? baseStyle.textYellow
                    : baseStyle.textGray
                }>
                {this.state.params.positionName
                  ? this.state.params.positionName
                  : '请选择'}
              </Text>
              <Iconright color={iconRightFontColor} style={sty.Iconright} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('PositionCategory', {
                callBack: res => {
                  const params = this.state.params;
                  params.positionClass = res.id;
                  this.setState({
                    positionClassName: res.name,
                    params: params,
                  });
                },
              });
            }}
            style={[baseStyle.borderBottom, sty.inputBox]}>
            <Text>职位类别</Text>
            <View style={[baseStyle.row]}>
              <Text
                style={
                  this.state.positionClassName
                    ? baseStyle.textYellow
                    : baseStyle.textGray
                }>
                {this.state.positionClassName
                  ? this.state.positionClassName
                  : '请选择'}
              </Text>
              {/* <Text style={baseStyle.textGray}>请选择</Text> */}
              <Iconright color={iconRightFontColor} style={sty.Iconright} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('PositionDes', {
                positionDesc: this.state.params.positionDesc,
                callBack: res => {
                  this.setParams(res.positionDesc, 'positionDesc');
                },
              });
            }}
            style={[baseStyle.borderBottom, sty.inputBox]}>
            <Text>职位描述</Text>
            <View style={[baseStyle.row]}>
              <Text style={baseStyle.textGray}>
                {this.state.params.positionDesc
                  ? this.state.params.positionDesc
                  : '请选择'}
              </Text>
              <Iconright color={iconRightFontColor} style={sty.Iconright} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.openPicked(this.state.salaryList, 'salary');
            }}
            style={[baseStyle.borderBottom, sty.inputBox]}>
            <Text>职位年薪</Text>
            <View style={[baseStyle.row]}>
              <Text
                style={
                  this.state.params.salaryId
                    ? baseStyle.textYellow
                    : baseStyle.textGray
                }>
                {this.state.params.salaryName || '请选择'}
              </Text>
              <Iconright color={iconRightFontColor} style={sty.Iconright} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('PositionBenefits', {
                positionBenefits: this.state.params.positionBenefits,
                callBack: res => {
                  this.setParams(res.positionBenefits, 'positionBenefits');
                },
              });
            }}
            style={[baseStyle.borderBottom, sty.inputBox]}>
            <Text>职位福利</Text>
            <View style={[baseStyle.row]}>
              <Text
                style={
                  this.state.params.positionBenefits
                    ? baseStyle.textYellow
                    : baseStyle.textGray
                }>
                {this.state.params.positionBenefits.toString() || '请选择'}
              </Text>
              <Iconright color={iconRightFontColor} style={sty.Iconright} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.openPicked(this.state.educationList, 'education');
            }}
            style={[baseStyle.borderBottom, sty.inputBox]}>
            <Text>学历最低要求</Text>
            <View style={[baseStyle.row]}>
              <Text
                style={
                  this.state.params.educationName
                    ? baseStyle.textYellow
                    : baseStyle.textGray
                }>
                {this.state.params.educationName || '请选择'}
              </Text>
              <Iconright color={iconRightFontColor} style={sty.Iconright} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.openPicked(this.state.experienceList, 'experience');
            }}
            style={[baseStyle.borderBottom, sty.inputBox]}>
            <Text>经验要求</Text>
            <View style={[baseStyle.row]}>
              <Text
                style={
                  this.state.params.experienceName
                    ? baseStyle.textYellow
                    : baseStyle.textGray
                }>
                {this.state.params.experienceName || '请选择'}
              </Text>
              <Iconright color={iconRightFontColor} style={sty.Iconright} />
            </View>
          </TouchableOpacity>
          <View style={[baseStyle.borderBottom, sty.inputBox]}>
            <Text>工作地点</Text>
            <View style={[baseStyle.row]}>
              <Text style={baseStyle.textGray}>请选择</Text>
              <Iconright color={iconRightFontColor} style={sty.Iconright} />
            </View>
          </View>
          <Button
            onPress={() => {
              this.savePosition();
            }}
            style={[sty.subBtn, {backgroundColor: '#D9B06F'}]}
            textStyle={{color: '#fff'}}>
            发布
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
