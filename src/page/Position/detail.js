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
} from 'react-native';
import Header from '../../components/Header';
import {setStatusBar} from '../../components/setStatusBar';
import {Button} from 'beeshell/dist/components/Button';
import {baseStyle} from '../../components/baseStyle';
import {Iconright} from '../../iconfont/Iconright';
import {IconShare} from '../../iconfont/IconShare';
import {Iconedit} from '../../iconfont/Iconedit';

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
      detail: {
        positionBenefits: [],
        currentUser: null,
      },
    };
  }
  UNSAFE_componentWillMount() {
    global.localStorage.get({key: 'currentUser'}).then(res => {
      this.setState({
        currentUser: res,
      });
    });
    this.getDetail();
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
      {id: id},
      res => {
        console.log('positionDetail', res);
        if (res.code === 1) {
          const resData = res.data;
          this.setState({
            detail: resData,
          });
          this.gettypelist(resData.salaryId, 'salary', 'salaryName');
        }
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
        Alert.alert(res.msg);
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
  render() {
    const detail = this.state.detail;
    return (
      <View
        style={{backgroundColor: '#FBFBFB', height: baseStyle.screenHeight}}>
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
        <ScrollView>
          <View style={[baseStyle.bgWhite, baseStyle.content]}>
            <View style={[baseStyle.row, baseStyle.justifyBetween]}>
              <Text style={baseStyle.ft16}>{detail.positionName || ''}</Text>
              <Text style={baseStyle.textRed}>{detail.salaryName || ''}</Text>
            </View>
            <View style={[baseStyle.row, baseStyle.paddingTop]}>
              <View style={sty.positionTag}>
                <Text style={sty.textGray}>{detail.workAddress || ''}</Text>
              </View>
              <View style={sty.positionTag}>
                <Text style={sty.textGray}>
                  {detail.experienceName || ''}年
                </Text>
              </View>
              <View style={sty.positionTag}>
                <Text style={sty.textGray}>{detail.educationName || ''}</Text>
              </View>
            </View>
            <View
              style={[
                baseStyle.flex,
                baseStyle.justifyBetween,
                baseStyle.paddingTop,
              ]}>
              <Text style={[baseStyle.textGray, baseStyle.ft12]}>
                1天前发布
              </Text>
              <View style={sty.attentionBtn}>
                <Text style={[baseStyle.textYellow, baseStyle.ft12]}>
                  关注职位
                </Text>
              </View>
            </View>
          </View>
          <View
            style={[
              baseStyle.bgWhite,
              baseStyle.justifyBetween,
              baseStyle.content,
              baseStyle.row,
              {marginTop: 5},
            ]}>
            <View style={[baseStyle.row]}>
              <Image
                style={sty.authorImg}
                source={require('../../images/author.png')}
              />
              <View style={baseStyle.paddingLeft}>
                <Text style={baseStyle.ft16}>{detail.userNickname || ''}</Text>
                <Text
                  style={[baseStyle.ft12, baseStyle.textGray, {marginTop: 10}]}>
                  {detail.companyName || ''}/{detail.userTitle || ''}
                </Text>
              </View>
            </View>
            <Iconright color="#D3CECE" />
          </View>
          <View style={[baseStyle.bgWhite, baseStyle.content, {marginTop: 20}]}>
            <Text style={baseStyle.ft16}>职位描述</Text>
            <Text style={baseStyle.paddingTop}>
              {detail.positionDesc || ''}
            </Text>
            <Text style={{paddingTop: 20}}>学历要求：</Text>
            <Text style={baseStyle.paddingTop}>
              {detail.educationName || ''}
            </Text>
            <Text style={{paddingTop: 20}}>经验要求：</Text>
            <Text style={baseStyle.paddingTop}>
              {detail.experienceName || ''}
            </Text>
            <Text style={[baseStyle.ft16, {paddingTop: 20}]}>职位福利</Text>
            {/* {detail.positionBenefits.length > 0 ? (
              <View style={[baseStyle.row, baseStyle.paddingTop]}>
                {detail.positionBenefits.map((item, idx) => {
                  return (
                    <View key={idx} style={sty.positionTag}>
                      <Text style={sty.textGray}>{item.name}</Text>
                    </View>
                  );
                })}
              </View>
            ) : null} */}
          </View>
          {/* <View style={[baseStyle.bgWhite, baseStyle.content, {marginTop: 10}]}>
            <Text style={[baseStyle.ft16, {paddingTop: 20}]}>职位补充说明</Text>
            <View
              style={[
                baseStyle.borderBottom,
                baseStyle.paddingBottom,
                baseStyle.paddingTop,
              ]}>
              <View style={baseStyle.row}>
                <Image
                  source={require('../../images/author.png')}
                  style={sty.authorImg}
                />
                <Text style={baseStyle.paddingLeft}>匿名用户</Text>
              </View>
              <Text style={baseStyle.paddingTop}>
                公司整体要求蛮严格的，对学历要求挺高，面试官很专业
                每个问题问的很仔细，也会引导，主要会问一些职业规划 等问题。
              </Text>
            </View>
            <View style={[baseStyle.paddingBottom, baseStyle.paddingTop]}>
              <View style={baseStyle.row}>
                <Image
                  source={require('../../images/author.png')}
                  style={sty.authorImg}
                />
                <Text style={baseStyle.paddingLeft}>匿名用户</Text>
              </View>
              <Text style={baseStyle.paddingTop}>
                公司整体要求蛮严格的，对学历要求挺高，面试官很专业
                每个问题问的很仔细，也会引导，主要会问一些职业规划 等问题。
              </Text>
            </View>
            <View style={baseStyle.paddingTop}>
              <Text style={baseStyle.textYellow}>查看全部面试经</Text>
            </View>
          </View> */}
          {/* <View style={[baseStyle.bgWhite, baseStyle.content, {marginTop: 5}]}>
            <View style={[baseStyle.justifyBetween, baseStyle.row]}>
              <View style={[baseStyle.row]}>
                <Image
                  style={sty.authorImg}
                  source={require('../../images/author.png')}
                />
                <View style={baseStyle.paddingLeft}>
                  <Text style={baseStyle.ft16}>{detail.companyName}</Text>
                  <Text
                    style={[
                      baseStyle.ft12,
                      baseStyle.textGray,
                      {marginTop: 10},
                    ]}>
                    100-299人 国企 上海宝山
                  </Text>
                </View>
              </View>
              <Iconright color="#D3CECE" />
            </View>
            <Image
              source={require('../../images/ditu.png')}
              style={{
                width: baseStyle.screenWidth - 20,
                height: 129,
                resizeMode: 'cover',
                marginTop: 15,
                marginBottom: 50,
              }}
            />
          </View> */}
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
                style={[sty.subBtn, {width: 166.5, backgroundColor: '#D9B06F'}]}
                textStyle={{color: '#fff'}}>
                立即沟通
              </Button>
            </View>
          </View>
        </ScrollView>
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
      </View>
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
    resizeMode: 'contain',
  },
  positionTag: {
    marginRight: 10,
    // padding: 3,
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 3,
    paddingBottom: 3,
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
});
