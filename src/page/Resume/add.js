import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  PixelRatio,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import {Button} from 'beeshell/dist/components/Button';
import Header from '../../components/Header';
import {setStatusBar} from '../../components/setStatusBar';
import {baseStyle} from '../../components/baseStyle';
import {Iconedit} from '../../iconfont/Iconedit';
import {Iconright} from '../../iconfont/Iconright';
import {Iconadd} from '../../iconfont/Iconadd';
import {IconcircleAdd} from '../../iconfont/IconcircleAdd';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class Resume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgSource: [],
      videoSource: null,
    };
  }

  render() {
    return (
      <View style={[baseStyle.bgWhite, {height: baseStyle.screenHeight}]}>
        <Header
          title="添加简历"
          right="预览简历"
          rightStyle={baseStyle.textYellow}
          fullScreen
          onRightPress={() => {
            console.log('预览简历');
          }}
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <ScrollView>
          <View style={{padding: 10}}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('ResumeInfo');
              }}
              style={[sty.inforItem, sty.flexContentBetween]}>
              <View>
                <View style={baseStyle.row}>
                  <Text>个人信息</Text>
                  <Iconedit style={baseStyle.paddingLeft} size={20} />
                </View>
                <View style={baseStyle.paddingTop}>
                  {/* <Text style={baseStyle.textGray}>请填写</Text> */}
                  <Text style={baseStyle.textGray}>7 年经验 | 28岁 | 本科</Text>
                </View>
              </View>
              <Image
                style={sty.authorImg}
                source={require('../../images/author.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('ResumeJobStatus');
              }}
              style={[sty.inforItem, sty.flexContentBetween]}>
              <Text>求职状态</Text>
              <View style={sty.rigtSty}>
                <Text style={baseStyle.textGray}>月内到岗</Text>
                <Iconright color="#999999" style={baseStyle.paddingLeft} />
              </View>
            </TouchableOpacity>
            <View style={sty.inforItem}>
              <TouchableOpacity
                style={[
                  sty.flexContentBetween,
                  baseStyle.paddingBottom,
                  {flex: 1},
                ]}>
                <Text>职业意向</Text>
                <Iconedit />
              </TouchableOpacity>
              <Text style={[baseStyle.textGray, baseStyle.paddingTop]}>
                人力资源经理
              </Text>
            </View>
            <TouchableOpacity style={sty.inforItem}>
              <View style={sty.flexContentBetween}>
                <Text>技能标签</Text>
                <Iconedit />
              </View>
              <View style={[baseStyle.row, baseStyle.paddingTop]}>
                <Button
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
            </TouchableOpacity>
            <View style={sty.inforItem}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('ResumeWorkExperience');
                }}
                style={sty.flexContentBetween}>
                <Text>工作经历</Text>
                <IconcircleAdd />
              </TouchableOpacity>
              <View style={baseStyle.paddingTop}>
                <View style={[sty.flexContentBetween]}>
                  <Text>上海宝山科技有限公司</Text>
                  <Text style={baseStyle.textGray}>2017.11-2020.01</Text>
                </View>
                <View style={baseStyle.paddingTop}>
                  <Text style={baseStyle.textGray}>人力资源经理 行政部</Text>
                </View>
                <View style={baseStyle.paddingTop}>
                  <Text style={baseStyle.textGray}>
                    1 我任职于该公司人力资源经理职位，在职期间负责制定公司
                    人力资源规划、组织设计、岗位职责设计，并根据公司发展不
                    断完善、优化；
                    2、建立并不断完善公司人力资源管理系统，解决引进人、培
                    养人和留人涉及的相关问题；
                  </Text>
                </View>
              </View>
            </View>
            <View style={sty.inforItem}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('ResumeProjectExperience');
                }}
                style={sty.flexContentBetween}>
                <Text>项目经历</Text>
                <IconcircleAdd />
              </TouchableOpacity>
              <View style={baseStyle.paddingTop}>
                <View style={[sty.flexContentBetween]}>
                  <Text>招聘校招春季活动</Text>
                  <Text style={baseStyle.textGray}>2017.11-2020.01</Text>
                </View>
                <View style={baseStyle.paddingTop}>
                  <Text style={baseStyle.textGray}>人力资源经理</Text>
                </View>
                <View style={baseStyle.paddingTop}>
                  <Text style={baseStyle.textGray}>
                    负责制定公司人力资源规划、组织设计、岗位职责设计，并根
                    据公司发展不断完善、优化；
                  </Text>
                </View>
              </View>
            </View>
            <View style={sty.inforItem}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('ResumeEducationalExperience');
                }}
                style={sty.flexContentBetween}>
                <Text>教育经历</Text>
                <IconcircleAdd />
              </TouchableOpacity>
              <View style={baseStyle.paddingTop}>
                <View style={[sty.flexContentBetween]}>
                  <Text>招聘校招春季活动</Text>
                  <Text style={baseStyle.textGray}>2017.11-2020.01</Text>
                </View>
                <View style={baseStyle.paddingTop}>
                  <Text style={baseStyle.textGray}>市场营销 | 本科</Text>
                </View>
              </View>
            </View>
            <View style={sty.inforItem}>
              <TouchableOpacity style={sty.flexContentBetween}>
                <Text>自我评价</Text>
                <Iconedit />
              </TouchableOpacity>
              <View style={baseStyle.paddingTop}>
                <Text style={baseStyle.textGray}>
                  6年工作经验 工作善于拽住工作重心，注意细节，能够充分
                  展现在工作中无限的激情，和冲劲。
                </Text>
              </View>
            </View>
            <View style={sty.inforItem}>
              <TouchableOpacity style={sty.flexContentBetween}>
                <Text>企业屏蔽</Text>
                <Iconedit />
              </TouchableOpacity>
              <View style={baseStyle.paddingTop}>
                <Text>上海德善科技有限公司</Text>
              </View>
            </View>
            <View style={sty.inforItem}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('ResumePrivacySet');
                }}
                style={sty.flexContentBetween}>
                <Text>简历设置</Text>
                <Iconedit />
              </TouchableOpacity>
              <View style={baseStyle.paddingTop}>
                <Text>可见</Text>
              </View>
            </View>
            <TouchableOpacity style={[sty.inforItem, sty.flexContentBetween]}>
              <Text>上传介绍视频</Text>
              <Iconedit />
            </TouchableOpacity>
          </View>
          <View
            style={[
              baseStyle.row,
              {justifyContent: 'center', paddingBottom: 40, paddingTop: 20},
            ]}>
            <Button
              style={[sty.subBtn, {borderColor: '#D9B06F', borderWidth: 0.5}]}
              textStyle={{color: '#D9B06F'}}>
              预览简历
            </Button>
            <Button
              style={[sty.subBtn, {backgroundColor: '#D9B06F'}]}
              textStyle={{color: '#fff'}}>
              附件简历上传
            </Button>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Resume;
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
  itemContent: {
    paddingTop: 10,
  },
  rigtSty: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  flexContentBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inforItem: {
    padding: 10,
    borderBottomColor: '#F6F6F6',
    borderBottomWidth: 0.5,
  },
  authorImg: {
    width: 44,
    height: 44,
  },
  notDataBox: {
    paddingTop: 100,
    height: baseStyle.screenHeight,
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  notDataMsg: {
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  notDataBtn: {
    borderRadius: 5,
    width: 300,
  },
  notDataImg: {
    width: 91.5,
    height: 84.5,
  },
});
