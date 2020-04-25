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
  Alert,
} from 'react-native';
import {Button} from 'beeshell/dist/components/Button';
import Header from '../../components/Header';
import {setStatusBar} from '../../components/setStatusBar';
import {baseStyle} from '../../components/baseStyle';
import {Iconedit} from '../../iconfont/Iconedit';
import {Iconright} from '../../iconfont/Iconright';
import {Iconadd} from '../../iconfont/Iconadd';
import {IconcircleAdd} from '../../iconfont/IconcircleAdd';
import {TopviewGetInstance} from 'beeshell';
import Picker from '../../components/picker';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class rreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgSource: [],
      videoSource: null,
      workExperienceList: [],
      projectExperienceList: [],
      educationalExpList: [],
      educationList: [],
      resume: {
        jobStatus: 0,
        resumeStatus: 0,
        resumeIntention: '',
        selfEvaluation: '',
        id: 1,
      },
      jobStatus: '',
      resumeStatus: '',
      pickId: null,
      resumeStatusList: [],
      jobStatusList: [
        {
          label: '可见',
          value: 0,
        },
        {
          label: '不可见',
          value: 1,
        },
      ],
    };
  }
  UNSAFE_componentWillMount() {
    global.gettypelist('education', res => {
      // 学历
      this.setState({
        educationList: res.data,
      });
    });
    global.gettypelist('resumeStatus', res => {
      // 简历设置
      this.setState({
        resumeStatusList: res.data,
      });
    });
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
  getAge() {
    const nowDate = new Date().getTime();
    const birthDate = this.state.resume.birthDate;
    const date = nowDate - birthDate;
    return parseInt(date / 1000 / 60 / 60 / 24 / 365);
  }
  getJobStatus(key) {
    const jobStatus = this.state.resume.jobStatus;
    const jobStatusItem = this.state.jobStatusList.find(item => {
      return item.value === jobStatus;
    });
    return jobStatusItem[key];
  }
  getResumeStatus(key) {
    const resumeStatus = this.state.resume.resumeStatus;
    const resumeStatusItem = this.state.resumeStatusList.find(item => {
      return item.value === resumeStatus;
    });
    if (resumeStatusItem) {
      return resumeStatusItem[key];
    } else {
      return '';
    }
  }
  updateResume() {
    global.httpPost(
      'resume/update',
      this.state.resume,
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      },
    );
  }
  render() {
    const resume = this.state.resume;
    return (
      <View style={[baseStyle.bgWhite, {height: baseStyle.screenHeight}]}>
        <Header
          title="简历预览"
          rightStyle={baseStyle.textYellow}
          fullScreen
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <ScrollView>
          <View style={{padding: 10}}>
            <View style={[sty.inforItem, sty.flexContentBetween]}>
              <View>
                <View style={baseStyle.row}>
                  <Text>个人信息</Text>
                  <Iconedit style={baseStyle.paddingLeft} size={20} />
                </View>
                <View style={baseStyle.paddingTop}>
                  <Text style={baseStyle.textGray}>
                    {resume.workyear ? `${resume.workyear}年经验 |` : null}
                    {resume.birthDate ? `${this.getAge()}岁 |` : null}
                    本科
                  </Text>
                </View>
              </View>
              <Image
                style={sty.authorImg}
                source={require('../../images/author.png')}
              />
            </View>
            <View style={[sty.inforItem, sty.flexContentBetween]}>
              <Text>求职状态</Text>
              <View style={sty.rigtSty}>
                <Text style={baseStyle.textGray}>
                  {this.getResumeStatus('dvalue')}
                </Text>
                <Iconright color="#999999" style={baseStyle.paddingLeft} />
              </View>
            </View>
            <View style={sty.inforItem}>
              <View
                style={[
                  sty.flexContentBetween,
                  baseStyle.paddingBottom,
                  {flex: 1},
                ]}>
                <Text>职业意向</Text>
                <Iconedit />
              </View>
              <Text style={[baseStyle.textGray, baseStyle.paddingTop]}>
                {resume.resumeIntention || '请选择职业意向'}
              </Text>
            </View>
            <View style={sty.inforItem}>
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
            </View>
            <View style={sty.inforItem}>
              <View style={sty.flexContentBetween}>
                <Text>工作经历</Text>
                <IconcircleAdd />
              </View>
              {this.state.workExperienceList.map(item => {
                return (
                  <View style={baseStyle.paddingTop}>
                    <View style={[sty.flexContentBetween]}>
                      <Text>{item.companyName}</Text>
                      <Text style={baseStyle.textGray}>
                        {global.date2Month(new Date(item.servicetimeStart))}-
                        {global.date2Month(new Date(item.servicetimeEnd))}
                      </Text>
                    </View>
                    <View style={baseStyle.paddingTop}>
                      <Text style={baseStyle.textGray}>
                        {item.positionName} {item.depName}
                      </Text>
                    </View>
                    <View style={baseStyle.paddingTop}>
                      <Text style={baseStyle.textGray}>{item.jobDesc}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
            <View style={sty.inforItem}>
              <View style={sty.flexContentBetween}>
                <Text>项目经历</Text>
              </View>
              {this.state.projectExperienceList.map(item => {
                return (
                  <View style={baseStyle.paddingTop}>
                    <View style={[sty.flexContentBetween]}>
                      <Text>{item.projectName}</Text>
                      <Text style={baseStyle.textGray}>
                        {global.date2Month(new Date(item.projectStart))}-
                        {global.date2Month(new Date(item.projectEnd))}
                      </Text>
                    </View>
                    {/* <View style={baseStyle.paddingTop}>
                    <Text style={baseStyle.textGray}>人力资源经理</Text>
                  </View> */}
                    <View style={baseStyle.paddingTop}>
                      <Text style={baseStyle.textGray}>{item.projectDesc}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
            <View style={sty.inforItem}>
              <View style={sty.flexContentBetween}>
                <Text>教育经历</Text>
              </View>
              {this.state.educationalExpList.map(item => {
                return (
                  <View style={baseStyle.paddingTop}>
                    <View style={[sty.flexContentBetween]}>
                      <Text>{item.schoolName}</Text>
                      <Text style={baseStyle.textGray}>
                        {global.date2Month(new Date(item.schoolStart))}-
                        {global.date2Month(new Date(item.schoolEnd))}
                      </Text>
                    </View>
                    <View style={baseStyle.paddingTop}>
                      {/* <Text style={baseStyle.textGray}>
                        市场营销 | {this.getEducationName(item.educationId)}
                      </Text> */}
                      <Text style={baseStyle.textGray}>
                        {this.getEducationName(item.educationId)}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
            <View style={sty.inforItem}>
              <View style={sty.flexContentBetween}>
                <Text>自我评价</Text>
              </View>
              {resume.selfEvaluation ? (
                <View style={baseStyle.paddingTop}>
                  <Text style={baseStyle.textGray}>
                    {resume.selfEvaluation}
                  </Text>
                </View>
              ) : null}
            </View>
            {/* <View style={sty.inforItem}>
              <TouchableOpacity style={sty.flexContentBetween}>
                <Text>企业屏蔽</Text>
                <Iconedit />
              </TouchableOpacity>
              <View style={baseStyle.paddingTop}>
                <Text>上海德善科技有限公司</Text>
              </View>
            </View> */}
            <View style={sty.inforItem}>
              <View style={sty.flexContentBetween}>
                <Text>简历设置</Text>
              </View>
              <View style={baseStyle.paddingTop}>
                <Text>{this.getJobStatus('label')}</Text>
              </View>
            </View>
            {/* <TouchableOpacity style={[sty.inforItem, sty.flexContentBetween]}>
              <Text>上传介绍视频</Text>
              <Iconedit />
            </TouchableOpacity> */}
          </View>
          {/* <View
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
          </View> */}
        </ScrollView>
      </View>
    );
  }
}

export default rreview;
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
