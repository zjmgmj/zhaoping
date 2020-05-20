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
import Header from '../../components/Header';
import {setStatusBar} from '../../components/setStatusBar';
import {baseStyle} from '../../components/baseStyle';

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
        labels: '',
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
      resumeId: null,
    };
  }
  UNSAFE_componentWillMount() {
    const resumeId = this.props.navigation.getParam('id');
    if (resumeId) {
      this.setState({resumeId});
      this.getDetail(resumeId);
      this.getResumeworkexpList(resumeId);
      this.getResumeprojectexpList(resumeId);
      this.getResumeschoolexpList(resumeId);
    }
    global.gettypelist('education', res => {
      // 学历
      this.setState({
        educationList: res.data,
      });
    });
    global.gettypelist('resumeStatus', res => {
      // 简历设置
      console.log('resumeStatus', res.data);
      this.setState({
        resumeStatusList: res.data,
      });
    });
  }
  getDetail(id) {
    global.httpGet(
      'resume/detail',
      {id: id},
      res => {
        console.log('resume----', res);
        this.setState({
          resume: res.data,
        });
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
  setResume(key, value) {
    const resume = this.state.resume;
    resume[key] = value;
    this.setState({
      resume: resume,
    });
  }
  getAge() {
    const nowDate = new Date().getTime();
    const birthDate = this.state.resume.birthDate;
    const date = nowDate - birthDate;
    return parseInt(date / 1000 / 60 / 60 / 24 / 365);
  }
  setWorkExperience(res) {
    console.log(res);
    const workExperienceList = this.state.workExperienceList;
    workExperienceList.push(res);
    this.setState({
      workExperienceList: workExperienceList,
    });
  }
  setProjectExperience(res) {
    const projectExperienceList = this.state.projectExperienceList;
    projectExperienceList.push(res);
    this.setState({
      projectExperienceList: projectExperienceList,
    });
  }
  getJobStatus(key) {
    const jobStatus = this.state.resume.jobStatus;
    const jobStatusItem = this.state.jobStatusList.find(item => {
      return item.value === jobStatus;
    });
    return jobStatusItem ? jobStatusItem[key] : null;
  }
  getResumeStatus(key) {
    const resumeStatus = this.state.resume.resumeStatus;
    const resumeStatusItem = this.state.resumeStatusList.find(item => {
      return item.id === resumeStatus;
    });
    console.log('resumeStatusItem', resumeStatusItem);
    if (resumeStatusItem) {
      return resumeStatusItem[key];
    } else {
      return '';
    }
  }
  getResumeschoolexpList(id) {
    global.httpGet('resumeschoolexp/list', {resumeId: id}, res => {
      console.log('projectExperienceList', res);
      this.setState({
        educationalExpList: res.data,
      });
    });
  }
  getResumeworkexpList(id) {
    global.httpGet('resumeworkexp/list', {resumeId: id}, res => {
      console.log('projectExperienceList', res);
      this.setState({
        workExperienceList: res.data,
      });
    });
  }
  getResumeprojectexpList(id) {
    global.httpGet('resumeprojectexp/list', {resumeId: id}, res => {
      console.log('projectExperienceList', res);
      this.setState({
        projectExperienceList: res.data,
      });
    });
  }
  render() {
    const {resume, resumeId} = this.state;
    let labels = [];
    if (resume.labels) {
      labels = resume.labels.split(',');
    }
    console.log('labels', labels);
    return (
      <View style={[baseStyle.bgWhite, {flex: 1}]}>
        <Header
          title="简历预览"
          rightStyle={baseStyle.textYellow}
          fullScreen
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <ScrollView style={{flex: 1}}>
          <View style={{padding: 10, marginBottom: 10}}>
            <View style={[sty.inforItem, sty.flexContentBetween]}>
              <View>
                <View style={baseStyle.row}>
                  {/* <Text style={sty.title}>个人信息</Text> */}
                  <Text style={[sty.title]}>{resume.name}</Text>
                  {resume.sex ? (
                    <View style={[baseStyle.row, {paddingLeft: 5}]}>
                      <Text style={sty.title}>/</Text>
                      <Text style={[baseStyle.textGray, baseStyle.ft13]}>
                        {global.getSexStr(resume.sex)}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <View style={baseStyle.paddingTop}>
                  <Text style={baseStyle.textGray}>
                    {resume.workyear ? `${resume.workyear}年经验` : null}
                    {resume.birthDate ? `  |  ${resume.age}岁` : null}
                    {resume.educationName
                      ? `  |  ${resume.educationName}`
                      : null}
                    {resume.cityName || resume.regionName
                      ? `  |  ${resume.cityName}${resume.regionName}`
                      : null}
                  </Text>
                </View>
              </View>
              <View style={baseStyle.authorBox}>
                <Image style={baseStyle.authorImg} source={{uri: resume.pic}} />
              </View>
            </View>
            <View style={[sty.inforItem, sty.flexContentBetween]}>
              <Text style={sty.title}>求职状态</Text>
              <View style={sty.rigtSty}>
                <Text style={baseStyle.textGray}>
                  {this.getResumeStatus('code')}
                </Text>
                {/* <Iconright color="#999999" style={baseStyle.paddingLeft} /> */}
              </View>
            </View>
            <View style={sty.inforItem}>
              <View
                style={[
                  sty.flexContentBetween,
                  baseStyle.paddingBottom,
                  {flex: 1},
                ]}>
                <Text style={sty.title}>职业意向</Text>
              </View>
              <Text style={[baseStyle.textGray, baseStyle.paddingTop]}>
                {resume.resumeIntention || '请选择职业意向'}
              </Text>
            </View>
            <View style={sty.inforItem}>
              <View style={sty.flexContentBetween}>
                <Text style={sty.title}>技能标签</Text>
              </View>
              <View style={[baseStyle.row, baseStyle.paddingTop]}>
                {labels.length > 0
                  ? labels.map((item, idx) => {
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
                  : null}
              </View>
            </View>
            <View style={sty.inforItem}>
              <View style={sty.flexContentBetween}>
                <Text style={sty.title}>工作经历</Text>
              </View>
              {this.state.workExperienceList.map(item => {
                return (
                  <View key={item.id} style={baseStyle.paddingTop}>
                    {item.companyName ||
                    item.servicetimeStart ||
                    item.servicetimeEnd ? (
                      <View style={[sty.flexContentBetween]}>
                        <Text>{item.companyName}</Text>
                        <Text style={baseStyle.textGray}>
                          {global.date2Month(new Date(item.servicetimeStart))}-
                          {global.date2Month(new Date(item.servicetimeEnd))}
                        </Text>
                      </View>
                    ) : null}
                    {item.positionName || item.depName ? (
                      <View style={baseStyle.paddingTop}>
                        <Text style={baseStyle.textGray}>
                          {item.positionName} {item.depName}
                        </Text>
                      </View>
                    ) : null}
                    {item.jobDesc ? (
                      <View style={baseStyle.paddingTop}>
                        <Text style={baseStyle.textGray}>{item.jobDesc}</Text>
                      </View>
                    ) : null}
                  </View>
                );
              })}
            </View>
            <View style={sty.inforItem}>
              <View style={sty.flexContentBetween}>
                <Text style={sty.title}>项目经历</Text>
              </View>
              {this.state.projectExperienceList.map(item => {
                return (
                  <View key={item.id} style={baseStyle.paddingTop}>
                    {item.projectName ||
                    item.projectStart ||
                    item.projectEnd ? (
                      <View style={[sty.flexContentBetween]}>
                        <Text>{item.projectName}</Text>
                        <Text style={baseStyle.textGray}>
                          {global.date2Month(new Date(item.projectStart))}-
                          {global.date2Month(new Date(item.projectEnd))}
                        </Text>
                      </View>
                    ) : null}
                    {item.projectDesc ? (
                      <View style={baseStyle.paddingTop}>
                        <Text style={baseStyle.textGray}>
                          {item.projectDesc}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                );
              })}
            </View>
            <View style={sty.inforItem}>
              <View style={sty.flexContentBetween}>
                <Text style={sty.title}>教育经历</Text>
              </View>
              {this.state.educationalExpList.map(item => {
                return (
                  <View key={item.id} style={baseStyle.paddingTop}>
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
                <Text style={sty.title}>自我评价</Text>
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
                <Text style={sty.title}>简历设置</Text>
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
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
