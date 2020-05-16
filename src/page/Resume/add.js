import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
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
class Resume extends Component {
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
        console.log('resume', res);
        this.setState({
          resume: res.data,
        });
      },
      err => {
        console.log(err);
      },
    );
    // this.getResumeworkexpList(id);
    // this.getResumeprojectexpList(id);
    // this.getResumeschoolexpList(id);
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
  openPicked({list, key, valueKey, labelKey = 'label'}) {
    TopviewGetInstance()
      .add(
        <Picker
          list={list}
          labelKey={labelKey}
          valueKey={valueKey}
          selected={this.state.resume[key]}
          close={() => {
            TopviewGetInstance().remove(this.state.pickId);
          }}
          selectedEvent={item => {
            const resume = this.state.resume;
            resume[key] = item[valueKey];
            this.setState({
              resume: resume,
            });
            TopviewGetInstance().remove(this.state.pickId);
            this.updateResume();
          }}
        />,
      )
      .then(id => {
        this.setState({
          pickId: id,
        });
      });
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
    return jobStatusItem[key];
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
  saveResume() {
    global.httpPost(
      'resume/save',
      this.state.resume,
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      },
    );
  }
  setParams(val, key) {
    const params = this.state.resume;
    params[key] = val;
    this.setState({
      resume: params,
    });
    this.updateResume();
  }
  delete() {
    global.httpGet('resume/delete', {id: this.state.resumeId}, res => {
      console.log(res);
      this.props.navigation.state.params.callBack();
      this.props.navigation.goBack();
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
          title={resumeId ? '编辑简历' : '添加简历'}
          right={resumeId ? '预览简历' : null}
          rightStyle={baseStyle.textYellow}
          fullScreen
          onRightPress={() => {
            if (!resumeId) {
              return false;
            }
            this.props.navigation.navigate('Rreview', {
              id: resumeId,
            });
          }}
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <ScrollView style={{flex: 1}}>
          <View style={{padding: 10}}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('ResumeInfo', {
                  data: resume,
                  callBack: res => {
                    console.log('ResumeInfo', res);
                    this.setState({
                      resume: Object.assign(resume, res),
                    });
                  },
                });
              }}
              style={[sty.inforItem, sty.flexContentBetween]}>
              <View>
                <View style={baseStyle.row}>
                  <Text style={sty.title}>个人信息</Text>
                  <Iconedit style={baseStyle.paddingLeft} size={20} />
                </View>
                <View style={baseStyle.paddingTop}>
                  <Text style={baseStyle.textGray}>
                    {resume.workyear ? `${resume.workyear}年经验` : null}
                    {resume.birthDate ? `  |  ${resume.age}岁` : null}
                    {resume.educationName
                      ? `  |  ${resume.educationName}`
                      : null}
                  </Text>
                </View>
              </View>
              <View style={baseStyle.authorBox}>
                <Image style={baseStyle.authorImg} source={{uri: resume.pic}} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.openPicked({
                  list: this.state.resumeStatusList,
                  key: 'resumeStatus',
                  labelKey: 'code',
                  valueKey: 'id',
                });
              }}
              style={[sty.inforItem, sty.flexContentBetween]}>
              <Text style={sty.title}>求职状态</Text>
              <View style={sty.rigtSty}>
                <Text style={baseStyle.textGray}>
                  {this.getResumeStatus('code')}
                </Text>
                <Iconright color="#999999" style={baseStyle.paddingLeft} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('PositionCategory', {
                  callBack: res => {
                    this.setParams(res.name, 'resumeIntention');
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
                <Text style={sty.title}>职业意向</Text>
                <Iconedit />
              </View>
              <Text style={[baseStyle.textGray, baseStyle.paddingTop]}>
                {resume.resumeIntention || '请选择职业意向'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('SkillTags', {
                  labels: this.state.resume.labels,
                  callBack: res => {
                    console.log('callBack', res);
                    this.setParams(res.labels, 'labels');
                  },
                });
              }}
              style={sty.inforItem}>
              <View style={sty.flexContentBetween}>
                <Text style={sty.title}>技能标签</Text>
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
                          labels: this.state.resume.labels,
                          callBack: res => {
                            console.log('callBack', res);
                            this.setParams(res.labels, 'labels');
                          },
                        });
                      }}
                      size="sm"
                      style={{borderColor: '#999999', marginRight: 10}}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
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
            <View style={sty.inforItem}>
              <TouchableOpacity
                onPress={() => {
                  if (!resume.id) {
                    Alert.alert('提示', '请先完善个人信息');
                    return false;
                  }
                  this.props.navigation.navigate('ResumeWorkExperience', {
                    resumeId: resume.id,
                    callBack: res => {
                      this.getResumeworkexpList(resume.id);
                      // this.setWorkExperience(res);
                    },
                  });
                }}
                style={sty.flexContentBetween}>
                <Text style={sty.title}>工作经历</Text>
                <IconcircleAdd />
              </TouchableOpacity>
              {this.state.workExperienceList.map(item => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('ResumeWorkExperience', {
                        resumeId: resume.id,
                        id: item.id,
                        type: 'add',
                        item: item,
                        callBack: res => {
                          this.getResumeworkexpList(resume.id);
                        },
                      });
                    }}
                    key={item.id}
                    style={baseStyle.paddingTop}>
                    {item.companyName ||
                    item.servicetimeStart ||
                    item.servicetimeEnd ? (
                      <View style={[sty.flexContentBetween]}>
                        <Text>{item.companyName}</Text>
                        <View style={baseStyle.row}>
                          <Text style={baseStyle.textGray}>
                            {global.date2Month(new Date(item.servicetimeStart))}
                            -{global.date2Month(new Date(item.servicetimeEnd))}
                          </Text>
                          <Iconright
                            color="#D3CECE"
                            style={[{fontSize: 12, paddingLeft: 15}]}
                          />
                        </View>
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
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={sty.inforItem}>
              <TouchableOpacity
                onPress={() => {
                  if (!resume.id) {
                    Alert.alert('提示', '请先完善个人信息');
                    return false;
                  }
                  this.props.navigation.navigate('ResumeProjectExperience', {
                    resumeId: resume.id,
                    type: 'add',
                    callBack: res => {
                      console.log('callBack', res);
                      // this.setProjectExperience(res);
                      this.getResumeprojectexpList(resume.id);
                    },
                  });
                }}
                style={sty.flexContentBetween}>
                <Text style={sty.title}>项目经历</Text>
                <IconcircleAdd />
              </TouchableOpacity>
              {this.state.projectExperienceList.map(item => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate(
                        'ResumeProjectExperience',
                        {
                          resumeId: resume.id,
                          item: item,
                          id: item.id,
                          callBack: res => {
                            this.getResumeprojectexpList(resume.id);
                          },
                        },
                      );
                    }}
                    key={item.id}
                    style={baseStyle.paddingTop}>
                    {item.projectName ||
                    item.projectStart ||
                    item.projectEnd ? (
                      <View style={[sty.flexContentBetween]}>
                        <Text>{item.projectName}</Text>
                        <View style={baseStyle.row}>
                          <Text style={baseStyle.textGray}>
                            {global.date2Month(new Date(item.projectStart))}-
                            {global.date2Month(new Date(item.projectEnd))}
                          </Text>
                          <Iconright
                            color="#D3CECE"
                            style={[{fontSize: 12, paddingLeft: 15}]}
                          />
                        </View>
                      </View>
                    ) : null}
                    {item.projectDesc ? (
                      <View style={baseStyle.paddingTop}>
                        <Text style={baseStyle.textGray}>
                          {item.projectDesc}
                        </Text>
                      </View>
                    ) : null}
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={sty.inforItem}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate(
                    'ResumeEducationalExperience',
                    {
                      resumeId: resume.id,
                      type: 'add',
                      callBack: res => {
                        this.getResumeschoolexpList(resume.id);
                        // const educationalExpList = this.state
                        //   .educationalExpList;
                        // educationalExpList.push(res);
                        // this.setState({
                        //   educationalExpList: educationalExpList,
                        // });
                      },
                    },
                  );
                }}
                style={sty.flexContentBetween}>
                <Text style={sty.title}>教育经历</Text>
                <IconcircleAdd />
              </TouchableOpacity>
              {this.state.educationalExpList.map(item => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      console.log('id', item.id);
                      debugger;
                      this.props.navigation.navigate(
                        'ResumeEducationalExperience',
                        {
                          resumeId: resume.id,
                          item: item,
                          id: item.id,
                          callBack: res => {
                            debugger;
                            console.log(res);
                            this.getResumeschoolexpList(resume.id);
                          },
                        },
                      );
                    }}
                    key={item.id}
                    style={baseStyle.paddingTop}>
                    <View style={[sty.flexContentBetween]}>
                      <Text>{item.schoolName}</Text>
                      <View style={baseStyle.row}>
                        <Text style={baseStyle.textGray}>
                          {global.date2Month(new Date(item.schoolStart))}-
                          {global.date2Month(new Date(item.schoolEnd))}
                        </Text>
                        <Iconright
                          color="#D3CECE"
                          style={[{fontSize: 12, paddingLeft: 15}]}
                        />
                      </View>
                    </View>
                    <View style={baseStyle.paddingTop}>
                      {/* <Text style={baseStyle.textGray}>
                        市场营销 | {this.getEducationName(item.educationId)}
                      </Text> */}
                      <Text style={baseStyle.textGray}>
                        {this.getEducationName(item.educationId)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={sty.inforItem}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Evaluation', {
                    selfEvaluation: this.state.resume.selfEvaluation,
                    callBack: res => {
                      console.log(res);
                      const resume = this.state.resume;
                      resume.selfEvaluation = res;
                      this.setState({
                        resume: resume,
                      });
                      this.updateResume();
                    },
                  });
                }}
                style={sty.flexContentBetween}>
                <Text style={sty.title}>自我评价</Text>
                <Iconedit />
              </TouchableOpacity>
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
              <TouchableOpacity
                onPress={() => {
                  // this.props.navigation.navigate('ResumePrivacySet');
                  this.openPicked({
                    list: this.state.jobStatusList,
                    key: 'jobStatus',
                    valueKey: 'value',
                  });
                }}
                style={sty.flexContentBetween}>
                <Text style={sty.title}>简历设置</Text>
                <Iconedit />
              </TouchableOpacity>
              <View style={baseStyle.paddingTop}>
                <Text style={baseStyle.textGray}>
                  {this.getJobStatus('label')}
                </Text>
              </View>
            </View>
            {/* <TouchableOpacity style={[sty.inforItem, sty.flexContentBetween]}>
              <Text>上传介绍视频</Text>
              <Iconedit />
            </TouchableOpacity> */}
          </View>
          <View
            style={[
              baseStyle.row,
              {
                justifyContent: 'center',
                paddingBottom: 40,
                paddingTop: 20,
                paddingLeft: 20,
                paddingRight: 20,
              },
            ]}>
            {resumeId ? (
              <Button
                onPress={() => {
                  this.delete();
                }}
                style={[
                  sty.subBtn,
                  {
                    flex: 1,
                    borderColor: '#D9B06F',
                    backgroundColor: '#FBF8F2',
                    borderWidth: 0.5,
                  },
                ]}
                textStyle={{color: '#D9B06F'}}>
                删除
              </Button>
            ) : (
              <Button
                onPress={() => {
                  this.props.navigation.navigate('Rreview', {
                    id: resumeId,
                  });
                }}
                style={[
                  sty.subBtn,
                  {
                    flex: 1,
                    borderColor: '#D9B06F',
                    backgroundColor: '#FBF8F2',
                    borderWidth: 0.5,
                  },
                ]}
                textStyle={{color: '#D9B06F'}}>
                简历预览
              </Button>
            )}
            <Button
              onPress={() => {
                this.props.navigation.state.params.callBack();
                this.props.navigation.goBack();
              }}
              style={[sty.subBtn, {flex: 1, backgroundColor: '#D9B06F'}]}
              textStyle={{color: '#fff'}}>
              保存简历
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
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
