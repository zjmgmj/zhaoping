import React, {Component} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  Platform,
} from 'react-native';
import Header from '../../components/Header';
import {setStatusBar} from '../../components/setStatusBar';
import {Button} from 'beeshell/dist/components/Button';
import {baseStyle} from '../../components/baseStyle';
import {Iconright} from '../../iconfont/Iconright';
import {IconShare} from '../../iconfont/IconShare';
import {Iconedit} from '../../iconfont/Iconedit';
import {WebView} from 'react-native-webview';

@setStatusBar({
  barStyle: 'light-content',
  translucent: true,
  backgroundColor: 'transparent',
})
class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shareModal: false,
      feedbacklist: [],
      detail: {
        currentUser: null,
      },
      company: null,
      headHeight: 0,
      getNum: 0,
    };
  }
  UNSAFE_componentWillMount() {
    global.Loading.showLoading();
    global.localStorage.get({key: 'currentUser'}).then(res => {
      this.setState({
        currentUser: res,
      });
    });
    this.getDetail();
    this.getCompany();
    this.getintfeedbacklist();
  }
  gettypelist(id, type, key) {
    global.gettypelist(type, res => {
      const resData = res.data;
      const findData = resData.find(item => {
        return item.id === id;
      });
      const detail = this.state.detail;
      detail[key] = findData.dvalue;
      this.setState({
        detail: detail,
      });
    });
  }
  getDetail() {
    const id = this.props.navigation.getParam('id');
    global.httpGet(
      'position/detail',
      {id: id, seluserId: this.state.currentUser.userId},
      res => {
        if (res.code === 1) {
          const resData = res.data;
          console.log('positionDetail', resData);
          this.setState({
            detail: resData,
            getNum: this.state.getNum + 1,
          });
        }
      },
      err => {
        console.log(err);
      },
    );
  }
  getCompany() {
    const companyId = this.props.navigation.getParam('companyId');
    global.httpGet(
      'company/detail',
      {id: companyId},
      res => {
        console.log('getCompany', res);
        this.setState({
          company: res.data,
          getNum: this.state.getNum + 1,
        });
      },
      err => {
        console.log(err);
      },
    );
  }
  positionrecord(resumeId) {
    const detail = this.state.detail;
    const params = {
      positionId: detail.id,
      resumeId: resumeId,
      // status: 0,
      userId: this.state.currentUser.userId,
    };
    console.log('params', params);
    global.httpPost(
      'positionrecord/save',
      params,
      res => {
        Alert.alert(res.data || '投递成功');
      },
      err => {
        console.log(err);
      },
    );
  }
  onpenModal() {
    this.setState({
      shareModal: true,
    });
  }
  getintfeedbacklist() {
    const params = {
      page: 1,
      size: 2,
      positionId: this.props.navigation.getParam('id'),
    };
    global.httpGet('position/getintfeedbacklist', params, res => {
      console.log('getintfeedbacklist', res);
      this.setState({
        feedbacklist: res.data.result,
        getNum: this.state.getNum + 1,
      });
    });
  }
  getSource() {
    const source = {
      uri: 'http://114.55.169.95/yun_rest/mapInfo.html',
    };
    return source;
  }
  onMessage() {}
  render() {
    const {detail, company, currentUser, feedbacklist, getNum} = this.state;
    // if (!detail.id && !currentUser) {
    //   return false;
    // }
    console.log('getNum', getNum);
    if (getNum < 3) {
      return false;
    }
    global.Loading.dismissLoading();
    console.log('currentUser', currentUser.userType);
    const positionBenefits = detail.positionBenefits
      ? detail.positionBenefits.split(',')
      : [];
    return (
      <ScrollView
        style={[
          {
            backgroundColor: '#fff',
            flexDirection: 'column',
            flex: 1,
            // height: baseStyle.deviceScreenHeight,
          },
        ]}>
        <ImageBackground
          style={sty.headSty}
          source={require('../../images/position_bg.png')}>
          <Header
            color="#fff"
            title="职位详情"
            onPressBack={() => {
              this.props.navigation.goBack();
            }}
            onRightPress={() => {
              this.onpenModal();
            }}
            right={<IconShare color="#fff" size={20} />}
            fullScreen
            isBorder={false}
          />
        </ImageBackground>
        <View style={{flex: 1}}>
          <View style={[baseStyle.bgWhite, baseStyle.content]}>
            <View style={[baseStyle.row, baseStyle.justifyBetween]}>
              <Text style={[{fontSize: 18, fontWeight: 'bold'}]}>
                {detail.positionName || ''}
              </Text>
              <Text style={baseStyle.textRed}>{detail.salaryName || ''}</Text>
            </View>
            <View style={[baseStyle.row, baseStyle.paddingTop]}>
              {detail.cityName ? (
                <View style={sty.positionTag}>
                  <Text style={sty.textGray}>
                    {detail.cityName}
                    {detail.regionName}
                  </Text>
                </View>
              ) : null}
              {detail.experienceName ? (
                <View style={sty.positionTag}>
                  <Text style={sty.textGray}>{detail.experienceName}</Text>
                </View>
              ) : null}
              {detail.educationName ? (
                <View style={sty.positionTag}>
                  <Text style={sty.textGray}>{detail.educationName}</Text>
                </View>
              ) : null}
            </View>
            <View
              style={[
                baseStyle.flex,
                baseStyle.justifyBetween,
                baseStyle.paddingTop,
              ]}>
              <Text style={[baseStyle.textGray, baseStyle.ft12]}>
                {global.date2Str(detail.createDate)}
              </Text>
              <View style={sty.attentionBtn}>
                <Text style={[baseStyle.textYellow, baseStyle.ft12]}>
                  关注职位
                </Text>
              </View>
            </View>
          </View>
          {currentUser.userType === 2 ? (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('PersonalInfo', {
                  id: detail.userId,
                  userId: currentUser.userId,
                });
              }}
              style={[
                baseStyle.bgWhite,
                baseStyle.justifyBetween,
                baseStyle.content,
                baseStyle.row,
                {
                  marginTop: 5,
                  paddingTop: 15,
                  borderTopColor: '#FBFBFB',
                  borderTopWidth: 5,
                },
              ]}>
              <View style={[baseStyle.row]}>
                <View style={baseStyle.authorBox}>
                  <Image
                    style={baseStyle.authorImg}
                    source={{uri: detail.userPic}}
                  />
                </View>
                <View style={baseStyle.paddingLeft}>
                  <Text style={baseStyle.ft16}>
                    {detail.userNickname || '暂无'}
                  </Text>
                  <Text
                    style={[
                      baseStyle.ft12,
                      baseStyle.textGray,
                      {marginTop: 10},
                    ]}>
                    {detail.userTitle}
                  </Text>
                </View>
              </View>
              <Iconright color="#D3CECE" />
            </TouchableOpacity>
          ) : null}
          <View
            style={[
              baseStyle.bgWhite,
              {
                marginTop: 10,
                borderTopColor: '#FBFBFB',
                borderTopWidth: 10,
                paddingLeft: 10,
                paddingRight: 10,
                paddingBottom: 10,
              },
            ]}>
            <Text style={sty.positionTitle}>职位描述</Text>
            <Text style={baseStyle.paddingTop}>
              {detail.positionDesc || ''}
            </Text>
            <Text style={sty.positionTitleMin}>学历要求：</Text>
            <Text style={baseStyle.paddingTop}>
              {detail.educationName || ''}
            </Text>
            <Text style={sty.positionTitleMin}>经验要求：</Text>
            <Text style={baseStyle.paddingTop}>
              {detail.experienceName || ''}
            </Text>
            {detail.positionBenefits ? (
              <View>
                <Text style={sty.positionTitle}>职位福利</Text>
                <View
                  style={[
                    baseStyle.row,
                    baseStyle.paddingTop,
                    {flexWrap: 'wrap'},
                  ]}>
                  {positionBenefits.map((item, idx) => {
                    return (
                      <View key={idx} style={sty.positionTag}>
                        <Text style={sty.textGray}>{item}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            ) : null}
          </View>
          {/* {feedbacklist.length > 0 ? ( */}
          <View
            style={[
              baseStyle.bgWhite,
              {paddingLeft: 10, paddingRight: 10},
              {marginTop: 5, borderTopColor: '#FBFBFB', borderTopWidth: 5},
            ]}>
            <Text style={sty.positionTitle}>职位补充说明</Text>
            {feedbacklist.length > 0 ? (
              <View>
                {feedbacklist.map((item, idx) => {
                  return (
                    <View
                      key={item.id}
                      style={[
                        idx === 0 ? baseStyle.borderBottom : null,
                        {paddingBottom: 20, paddingTop: 20},
                      ]}>
                      <View style={baseStyle.row}>
                        <View style={baseStyle.authorBoxMin}>
                          <Image
                            style={baseStyle.authorImgMin}
                            source={{uri: item.userPic}}
                          />
                        </View>
                        <Text
                          style={[baseStyle.paddingLeft, baseStyle.authorName]}>
                          {item.isanonymous ? '匿名用户' : item.userNickname}
                        </Text>
                      </View>
                      <Text style={baseStyle.paddingTop}>
                        {item.intfeedback}
                      </Text>
                    </View>
                  );
                })}
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('InterviewList', {
                      positionId: detail.id,
                    });
                  }}>
                  <Text style={[baseStyle.textYellow, {paddingBottom: 10}]}>
                    查看全部面试经
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={{paddingTop: 10}}>暂无</Text>
            )}
          </View>
          {/* ) : null} */}

          {company ? (
            <View
              style={[
                baseStyle.bgWhite,
                baseStyle.content,
                {marginTop: 5, borderTopColor: '#FBFBFB', borderTopWidth: 5},
              ]}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('CompanyInfo', {
                    id: company.id,
                  });
                }}
                style={[baseStyle.justifyBetween, baseStyle.row]}>
                <View style={[baseStyle.row]}>
                  <View style={[baseStyle.logoBox, {borderWidth: 0}]}>
                    <Image
                      style={baseStyle.logoImg}
                      source={{uri: company.logo}}
                    />
                  </View>
                  <View style={baseStyle.paddingLeft}>
                    <Text style={baseStyle.companyName}>{company.name}</Text>
                    <View
                      style={[
                        baseStyle.row,
                        baseStyle.ft12,
                        baseStyle.textGray,
                        {marginTop: 10},
                      ]}>
                      <Text style={baseStyle.marginRight}>
                        {company.companySizeName}
                      </Text>
                      <Text style={baseStyle.marginRight}>
                        {company.unitQualificationName}
                      </Text>
                      <Text style={baseStyle.marginRight}>
                        {company.cityName}
                      </Text>
                    </View>
                  </View>
                </View>
                <Iconright color="#D3CECE" />
              </TouchableOpacity>
              <WebView
                ref={ref => {
                  this.webview = ref;
                }}
                javaScriptEnabled
                scalesPageToFit
                style={{height: 129, marginTop: 10}}
                source={this.getSource()} //网络地址，放在本地会导致postmessage失效
                onMessage={this.onMessage.bind(this)}
                onLoad={() => {
                  this.webview.postMessage(
                    JSON.stringify({
                      dest: `${company.longitude},${company.latitude}`,
                      destName: company.address,
                    }),
                  );
                }}
              />
            </View>
          ) : null}
          {currentUser.userType == 2 ? (
            <View
              style={[
                baseStyle.bgWhite,
                baseStyle.content,
                baseStyle.row,
                baseStyle.justifyBetween,
                {
                  borderTopColor: '#E8E7E7',
                  borderTopWidth: 0.5,
                  paddingTop: 15,
                  paddingBottom: 15,
                },
              ]}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    shareModal: true,
                  });
                }}
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                <IconShare size={25} />
                <Text style={{marginTop: 5}}>我要推荐</Text>
              </TouchableOpacity>
              <View style={baseStyle.row}>
                <Button
                  onPress={() => {
                    this.props.navigation.navigate('PostResumeList', {
                      callBack: resumeId => {
                        console.log(resumeId);
                        this.positionrecord(resumeId);
                      },
                    });
                    console.log('投递简历');
                  }}
                  style={[
                    sty.subBtn,
                    {width: 109, borderColor: '#D9B06F', borderWidth: 0.5},
                  ]}
                  textStyle={{color: '#D9B06F'}}>
                  投递简历
                </Button>
                <Button
                  style={[
                    sty.subBtn,
                    {width: 166.5, backgroundColor: '#D9B06F'},
                  ]}
                  textStyle={{color: '#fff'}}>
                  立即沟通
                </Button>
              </View>
            </View>
          ) : (
            <View
              style={[
                baseStyle.bgWhite,
                baseStyle.content,
                baseStyle.row,
                baseStyle.justifyBetween,
                {
                  borderTopColor: '#E8E7E7',
                  borderTopWidth: 0.5,
                  paddingTop: 15,
                  paddingBottom: 15,
                },
              ]}>
              <Button
                onPress={() => {
                  this.props.navigation.navigate('ResumeList', {
                    positionId: detail.id,
                  });
                }}
                style={[sty.subBtn, {flex: 1, backgroundColor: '#D9B06F'}]}
                textStyle={{color: '#fff'}}>
                该职位收到的简历
              </Button>
            </View>
          )}
        </View>
        {/* <Share /> */}
        <Modal
          animationType="fade"
          visible={this.state.shareModal}
          transparent={true}
          cancelable={true}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              this.setState({
                shareModal: false,
              });
              return false;
            }}
            style={sty.modalBox}>
            <View style={{flexDirection: 'column', justifyContent: 'center'}}>
              <View style={sty.shareBox}>
                <ImageBackground
                  style={{width: 297, height: 100, padding: 10}}
                  source={require('../../images/md-duran-1410885-unsplash(1).png')}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({shareModal: false});
                      this.props.navigation.navigate('PositionChooseBg');
                      // return false;
                    }}>
                    <Text style={[baseStyle.textWhite, {textAlign: 'right'}]}>
                      选择背景
                    </Text>
                  </TouchableOpacity>
                </ImageBackground>
                <View style={baseStyle.relation}>
                  <View style={sty.shareBoxTitle}>
                    <Text style={baseStyle.textWhite}>分享该职位</Text>
                  </View>
                  <View
                    style={[
                      baseStyle.row,
                      {justifyContent: 'center', paddingTop: 30},
                    ]}>
                    <Text style={[{marginRight: 5}, baseStyle.ft15]}>
                      人力资源经理
                    </Text>
                    <Iconedit color="#666666" />
                  </View>
                  <View
                    style={[
                      baseStyle.row,
                      baseStyle.justifyBetween,
                      baseStyle.content,
                    ]}>
                    <Text>职位内容</Text>
                    <Text style={baseStyle.textYellow}>修改职位内容</Text>
                  </View>
                  <View style={{paddingLeft: 10, paddingRight: 10}}>
                    <Text style={{marginBottom: 15}}>
                      1、制定公司人力资源规划、组织设计、岗位职责设计，并根据公司发展不断完善、优化；
                    </Text>
                    <Text style={{marginBottom: 15}}>
                      2、建立并不断完善公司人力资源管理系统，解决引进人、培养人和留人涉及的相关问题；
                    </Text>
                    <Text style={{marginBottom: 15}}>
                      3、组织制定、实施公司绩效管理办法及考核、薪酬福利办法及管理工作；
                    </Text>
                    <View style={[baseStyle.row, baseStyle.paddingBottom]}>
                      <Text style={{fontWeight: 'bold'}}>公司名称：</Text>
                      <Text>上海德元电子器械有限公司</Text>
                    </View>
                    <View style={baseStyle.row}>
                      <Text style={{fontWeight: 'bold'}}>职位薪酬：</Text>
                      <Text>12000 元/月</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        paddingTop: 20,
                      }}>
                      <Image
                        style={{
                          width: 97.5,
                          height: 97.5,
                          resizeMode: 'contain',
                        }}
                        source={require('../../images/erweim.png')}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </ScrollView>
    );
  }
}

export default Detail;

const sty = StyleSheet.create({
  subBtn: {
    paddingLeft: 0,
    paddingRight: 0,
    height: 40,
    marginLeft: 5,
    borderRadius: 3,
  },
  headSty: {
    width: baseStyle.screenWidth,
    height: 89,
    resizeMode: 'contain',
  },
  authorImg: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
  },
  positionTag: {
    marginRight: 10,
    // padding: 3,
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 3,
    paddingBottom: 3,
    marginBottom: 3,
    backgroundColor: '#F1F3FC',
  },
  attentionBtn: {
    borderColor: '#D9B06F',
    borderRadius: 15,
    borderWidth: 0.5,
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
  modalBox: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: baseStyle.screenWidth,
    height: baseStyle.screenHeight,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  shareBox: {
    backgroundColor: '#fff',
    width: 297,
    paddingBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  shareBoxTitle: {
    position: 'absolute',
    top: -15,
    backgroundColor: '#D9B06F',
    width: 112,
    padding: 5,
    left: 87.5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  positionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 20,
  },
  positionTitleMin: {
    fontSize: 15,
    paddingTop: 15,
  },
  logoBox: {
    height: 50,
    width: 50,
    // borderRadius: 100,
    overflow: 'hidden',
  },
  logoImg: {
    height: 50,
    width: 50,
    // resizeMode: 'contain',
    resizeMode: 'cover',
  },
});
