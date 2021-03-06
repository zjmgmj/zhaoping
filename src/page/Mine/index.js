import React, {Component} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Header from '../../components/Header';
import {setStatusBar} from '../../components/setStatusBar';
import {Card} from 'react-native-shadow-cards';
import {baseStyle} from '../../components/baseStyle';
import {Iconright} from '../../iconfont/Iconright';

class MineList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const item = this.props.item;
    return (
      <View
        style={[
          baseStyle.row,
          baseStyle.paddingLeft,
          baseStyle.justifyBetween,
          baseStyle.paddingRight,
          {
            borderBottomColor: '#E8E7E7',
            paddingBottom: 16,
            paddingTop: 16,
            borderBottomWidth: 0.5,
          },
        ]}>
        <View style={baseStyle.row}>
          <Image style={sty.listIcon} source={item.icon} />
          <View style={baseStyle.paddingLeft}>
            <Text>{item.title}</Text>
          </View>
        </View>
        {item.right ? item.right : <Iconright color="#D3CECE" size={20} />}
      </View>
    );
  }
}
@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class Mine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      hrMenuList: [
        {
          icon: require('../../images/person_icon.png'),
          title: '个人信息',
          handler: () => {
            this.props.navigation.navigate('ResumeInfo', {
              from: 'mine',
              callBack: res => {
                console.log(res);
                this.getCurrentUser();
              },
            });
          },
        },
        {
          icon: require('../../images/qiye_icon.png'),
          title: '企业信息',
          url: 'CompanyList',
        },
        {
          icon: require('../../images/rec_icon.png'),
          title: '招聘管理',
          url: 'RecruitmentManagement',
        },
        {
          icon: require('../../images/yun_icon.png'),
          title: '专属管家',
          url: 'Housekeeper',
        },
        {
          icon: require('../../images/news_icon.png'),
          title: '行业资讯',
          url: 'IndustryNews',
        },
        {
          icon: require('../../images/qiehuan_icon.png'),
          title: '切换智推官角色',
          // url: 'Main',
          handler: () => {
            const currentUser = this.state.currentUser;
            currentUser.userType = 2;
            global.localStorage.set({
              key: 'currentUser',
              data: currentUser,
              expires: null,
            });
            // this.setState({
            //   currentUser: currentUser,
            // });
            this.props.navigation.navigate('Main');
          },
          right: (
            <View>
              <Text style={baseStyle.textYellow}>点击切换</Text>
            </View>
          ),
        },
        {
          icon: require('../../images/share_icon.png'),
          title: '分享APP',
          right: (
            <TouchableOpacity
              onPress={() => {
                console.log('rightPress');
              }}>
              <Text style={baseStyle.textYellow}>点击分享获取奖励</Text>
            </TouchableOpacity>
          ),
        },
      ],
      menuList: [
        {
          icon: require('../../images/person_icon.png'),
          title: '个人信息',
          handler: () => {
            this.props.navigation.navigate('ResumeInfo', {
              from: 'mine',
              callBack: res => {
                console.log(res);
                this.getCurrentUser();
              },
            });
          },
          // url: 'PersonInfo',
        },
        {
          icon: require('../../images/xin_icon.png'),
          title: '关注职位',
          url: 'FollowPosition',
        },
        {
          icon: require('../../images/xinxin_icon.png'),
          title: '关注的人',
          url: 'Followig',
        },
        {
          icon: require('../../images/success_icon.png'),
          title: '已入职',
        },
        {
          icon: require('../../images/tongji_icon.png'),
          title: '统计',
        },
        {
          icon: require('../../images/qun_icon.png'),
          title: '感兴趣社群',
          url: 'Community',
        },
        {
          icon: require('../../images/compony_icon.png'),
          title: '关于我们',
        },
        {
          icon: require('../../images/kf_icon.png'),
          title: '申请专属顾问',
          url: 'Housekeeper',
          // url: 'EntryInfor',
        },
        {
          icon: require('../../images/qiehuan_icon.png'),
          title: '切换HR角色',
          // url: 'HrMain',
          handler: () => {
            const currentUser = this.state.currentUser;
            currentUser.userType = 1;
            global.localStorage.set({
              key: 'currentUser',
              data: currentUser,
              expires: null,
            });
            // this.setState({
            //   currentUser: currentUser,
            // });
            this.props.navigation.navigate('HrMain');
          },
          right: (
            <View>
              <Text style={baseStyle.textYellow}>点击切换</Text>
            </View>
          ),
        },
      ],
      cardList: [
        {
          title: '账户',
          icon: require('../../images/account_icon.png'),
          url: '',
        },
        {
          title: '简历',
          icon: require('../../images/jianli_icon.png'),
          url: 'Resume',
        },
        {
          title: '求职进展',
          icon: require('../../images/jinzhan_icon.png'),
          url: 'Progress',
        },
      ],
    };
  }
  UNSAFE_componentWillMount() {
    this.getCurrentUser();
  }
  getCurrentUser() {
    global.localStorage.get({key: 'currentUser'}).then(res => {
      console.log('currentUser', res);
      this.setState({
        currentUser: res,
      });
    });
  }
  render() {
    const {currentUser} = this.state;
    if (!currentUser) {
      return false;
    }
    const list =
      currentUser.userType === 2 ? this.state.menuList : this.state.hrMenuList;
    return (
      <ScrollView
        style={{height: baseStyle.screenHeight, backgroundColor: '#fff'}}>
        <View>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('ResumeInfo', {
                from: 'mine',
                callBack: res => {
                  console.log(res);
                  this.getCurrentUser();
                },
              });
            }}>
            <ImageBackground
              style={sty.headSty}
              source={require('../../images/mine_bg.png')}>
              <Header isHeader={false} />
              <View style={[baseStyle.flex, sty.headContent]}>
                <View style={baseStyle.authorBox}>
                  <Image
                    source={{uri: currentUser.userPic}}
                    style={baseStyle.authorImg}
                  />
                </View>
                <View
                  style={[
                    baseStyle.paddingLeft,
                    {flexDirection: 'column', justifyContent: 'space-between'},
                  ]}>
                  <View>
                    <Text style={[baseStyle.textWhite, baseStyle.ft16]}>
                      {currentUser.userNickname}
                    </Text>
                  </View>
                  {this.state.userType === 1 ? (
                    <TouchableOpacity
                      onPress={() => {
                        console.log('签到');
                      }}
                      style={sty.qiandao}>
                      <Text style={baseStyle.textWhite}>点击签到</Text>
                    </TouchableOpacity>
                  ) : (
                    <View>
                      <View style={baseStyle.row}>
                        <Text
                          style={[
                            baseStyle.ft12,
                            baseStyle.textWhite,
                            baseStyle.paddingRight,
                          ]}>
                          {currentUser.userTitle}
                        </Text>
                        {currentUser.userSex === 2 ? (
                          <Image
                            source={require('../../images/girl_icon.png')}
                            style={sty.iconSize}
                          />
                        ) : (
                          <Image
                            source={require('../../images/man_icon.png')}
                            style={sty.iconSize}
                          />
                        )}
                      </View>
                      {/* <View>
                        <Text style={[baseStyle.ft12, baseStyle.textWhite]}>
                          <Text>28岁</Text>
                          <Text style={sty.pLpr}> | </Text>
                          <Text>工作5年</Text>
                          <Text style={sty.pLpr}> | </Text>
                          <Text>上海长宁区</Text>
                        </Text>
                      </View> */}
                    </View>
                  )}
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          <View style={sty.tabBoxSty}>
            <Card style={sty.tabContentSty}>
              {currentUser && currentUser.userType === 1 ? (
                <View style={[baseStyle.row, sty.hrCard]}>
                  <View
                    style={[
                      {borderRightColor: '#C4C4C4', borderRightWidth: 0.5},
                      sty.hrCardItem,
                    ]}>
                    <Text style={baseStyle.ft16}>当前积分</Text>
                    <Text
                      style={[
                        baseStyle.textRed,
                        baseStyle.ft15,
                        {marginTop: 5, fontWeight: 'bold'},
                      ]}>
                      3778
                    </Text>
                  </View>
                  <View style={sty.hrCardItem}>
                    <Text style={baseStyle.ft16}>铜币</Text>
                    <Text
                      style={[
                        baseStyle.textRed,
                        baseStyle.ft15,
                        {marginTop: 5, fontWeight: 'bold'},
                      ]}>
                      3778
                    </Text>
                  </View>
                </View>
              ) : (
                this.state.cardList.map((item, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate(item.url);
                      }}
                      style={sty.cardItem}
                      key={index}>
                      <Image style={sty.tabImg} source={item.icon} />
                      <Text style={sty.cardItemTitle}>{item.title}</Text>
                    </TouchableOpacity>
                  );
                })
              )}
            </Card>
          </View>
          <View style={{padding: 10, paddingTop: 80}}>
            {list.map((item, idx) => {
              return (
                <TouchableOpacity
                  key={idx}
                  onPress={() => {
                    console.log('---', item);
                    if (item.handler) {
                      item.handler();
                    } else {
                      this.props.navigation.navigate(item.url);
                    }
                  }}>
                  <MineList item={item} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default Mine;

const sty = StyleSheet.create({
  // menuList: {}
  listIcon: {
    width: 17,
    height: 17,
    resizeMode: 'contain',
  },
  cardItem: {
    position: 'relative',
    height: 75,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    width: 63,
  },
  cardItemTitle: {
    paddingTop: 5,
    // position: 'absolute',
    // bottom: 0,
  },
  tabBoxSty: {
    flexDirection: 'row',
    justifyContent: 'center',
    left: 0,
    right: 0,
    top: 125,
    position: 'absolute',
  },
  tabContentSty: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 332,
    // height: 83,
    paddingTop: 5,
    paddingBottom: 10,
  },
  tabImg: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  headSty: {
    width: baseStyle.screenWidth,
    height: 145.5,
    resizeMode: 'contain',
  },
  authorImgBox: {
    width: 60,
    height: 60,
    borderRadius: 100,
    overflow: 'hidden',
  },
  authorImg: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
  },
  headContent: {
    paddingTop: 20,
    paddingLeft: 55.5,
  },
  pLpr: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  qiandao: {
    backgroundColor: '#FFA300',
    width: 90,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  hrCardItem: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hrCard: {
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
