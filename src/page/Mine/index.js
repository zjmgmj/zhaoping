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
  // barStyle: 'light-content',
  translucent: true,
  backgroundColor: 'transparent',
})
class Mine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: 1,
      hrMenuList: [
        {
          icon: require('../../images/person_icon.png'),
          title: '个人信息',
          url: 'FollowPosition',
        },
        {
          icon: require('../../images/qiye_icon.png'),
          title: '企业信息',
          url: 'CompanyList',
        },
        {
          icon: require('../../images/yun_icon.png'),
          title: '专属管家',
          url: 'FollowPosition',
        },
        {
          icon: require('../../images/news_icon.png'),
          title: '行业资讯',
          url: 'FollowPosition',
        },
        {
          icon: require('../../images/qiehuan_icon.png'),
          title: '切换HR角色',
          right: (
            <TouchableOpacity
              onPress={() => {
                console.log('rightPress');
              }}>
              <Text style={baseStyle.textYellow}>点击切换</Text>
            </TouchableOpacity>
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
        },
        {
          icon: require('../../images/qiehuan_icon.png'),
          title: '切换HR角色',
          right: (
            <TouchableOpacity
              onPress={() => {
                console.log('rightPress');
              }}>
              <Text style={baseStyle.textYellow}>点击切换</Text>
            </TouchableOpacity>
          ),
        },
      ],
      cardList: [
        {title: '账户', icon: require('../../images/jianli_icon.png'), url: ''},
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
  render() {
    const list = this.state.hrMenuList;
    return (
      <ScrollView>
        <View style={[baseStyle.bgWhite, {height: baseStyle.screenHeight}]}>
          <ImageBackground
            style={sty.headSty}
            source={require('../../images/mine_bg.png')}>
            <Header isHeader={false} />
            <View style={[baseStyle.flex, sty.headContent]}>
              <Image
                source={require('../../images/author.png')}
                style={sty.authorImg}
              />
              <View
                style={[
                  baseStyle.paddingLeft,
                  {flexDirection: 'column', justifyContent: 'space-between'},
                ]}>
                <View>
                  <Text style={[baseStyle.textWhite, baseStyle.ft16]}>
                    Lisa yang
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
                    <View>
                      <Text style={[baseStyle.ft12, baseStyle.textWhite]}>
                        <Text>人力资源经理</Text>
                        <Text style={sty.pLpr}> | </Text>
                        <Text>深圳房多多科技公司</Text>
                      </Text>
                    </View>
                    <View>
                      <Text style={[baseStyle.ft12, baseStyle.textWhite]}>
                        <Text>28岁</Text>
                        <Text style={sty.pLpr}> | </Text>
                        <Text>工作5年</Text>
                        <Text style={sty.pLpr}> | </Text>
                        <Text>上海长宁区</Text>
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </View>
          </ImageBackground>
          <View style={sty.tabBoxSty}>
            <Card style={sty.tabContentSty}>
              {this.state.userType === 1 ? (
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
                    this.props.navigation.navigate(item.url);
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
    marginLeft: 10,
    marginRight: 10,
  },
  cardItemTitle: {
    position: 'absolute',
    bottom: 0,
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
    width: 63,
    height: 63,
  },
  headSty: {
    width: baseStyle.screenWidth,
    height: 145.5,
    resizeMode: 'contain',
  },
  authorImg: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
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
