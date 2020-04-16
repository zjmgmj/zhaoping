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

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class PostPosition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: [],
      params: {
        cityId: 0,
        cityName: '',
        companyId: 0,
        companyName: '',
        educationId: '',
        educationName: '',
        experienceId: '',
        experienceName: '',
        isrecommend: '',
        labels: '',
        positionBenefits: '',
        positionClass: '',
        positionDesc: '',
        positionName: '',
        positionRequirements: '',
        positionType: '',
        provinceId: '',
        regionId: '',
        regionName: '',
        salaryId: '',
        userId: '',
        userNickname: '',
        userPic: '',
        userTitle: '',
        workAddress: '',
      },
    };
  }
  componentDidMount() {
    this.getRegion();
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
    const params = {};
    global.httpPost('position/save', params, res => {
      console.log(res);
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
          <View style={[baseStyle.borderBottom, sty.inputBox]}>
            <Text>职位类型</Text>
            <View style={[baseStyle.row]}>
              <TextInput style={[baseStyle.textYellow, sty.textInputSty]}>
                内推职位
              </TextInput>
              {/* <Text style={baseStyle.textYellow}>内推职位</Text> */}
              <Iconright color={iconRightFontColor} style={sty.Iconright} />
            </View>
          </View>
          <View style={[baseStyle.borderBottom, sty.inputBox]}>
            <Text>公司信息</Text>
            <View style={[baseStyle.row]}>
              <TextInput
                placeholder="请输入公司信息"
                style={[baseStyle.textYellow, sty.textInputSty]}>
                山东共展信息科技有限公司
              </TextInput>
              {/* <Text style={baseStyle.textYellow}>山东共展信息科技有限公司</Text> */}
              <Iconright color={iconRightFontColor} style={sty.Iconright} />
            </View>
          </View>
          <View style={[baseStyle.borderBottom, sty.inputBox]}>
            <Text>职位名称</Text>
            <View style={[baseStyle.row]}>
              <TextInput
                placeholder="请输入职位名称"
                style={[baseStyle.textYellow, sty.textInputSty]}
              />
              <Iconright color={iconRightFontColor} style={sty.Iconright} />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('PositionCategory');
            }}
            style={[baseStyle.borderBottom, sty.inputBox]}>
            <Text>职位类别</Text>
            <View style={[baseStyle.row]}>
              <Text style={baseStyle.textGray}>请选择</Text>
              <Iconright color={iconRightFontColor} style={sty.Iconright} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('PositionDes');
            }}
            style={[baseStyle.borderBottom, sty.inputBox]}>
            <Text>职位描述</Text>
            <View style={[baseStyle.row]}>
              <Text style={baseStyle.textGray}>请选择</Text>
              <Iconright color={iconRightFontColor} style={sty.Iconright} />
            </View>
          </TouchableOpacity>
          <View style={[baseStyle.borderBottom, sty.inputBox]}>
            <Text>职位年薪</Text>
            <View style={[baseStyle.row]}>
              <Text style={baseStyle.textGray}>请选择</Text>
              <Iconright color={iconRightFontColor} style={sty.Iconright} />
            </View>
          </View>
          <View style={[baseStyle.borderBottom, sty.inputBox]}>
            <Text>职位福利</Text>
            <View style={[baseStyle.row]}>
              <Text style={baseStyle.textGray}>请选择</Text>
              <Iconright color={iconRightFontColor} style={sty.Iconright} />
            </View>
          </View>
          <View style={[baseStyle.borderBottom, sty.inputBox]}>
            <Text>学历最低要求</Text>
            <View style={[baseStyle.row]}>
              <Text style={baseStyle.textGray}>请选择</Text>
              <Iconright color={iconRightFontColor} style={sty.Iconright} />
            </View>
          </View>
          <View style={[baseStyle.borderBottom, sty.inputBox]}>
            <Text>经验要求</Text>
            <View style={[baseStyle.row]}>
              <Text style={baseStyle.textGray}>请选择</Text>
              <Iconright color={iconRightFontColor} style={sty.Iconright} />
            </View>
          </View>
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
