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
import Header from '../../../components/Header';
import {setStatusBar} from '../../../components/setStatusBar';
import {baseStyle} from '../../../components/baseStyle';
import {Iconright} from '../../../iconfont/Iconright';

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
class RecruitmentManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuList: [
        {
          icon: require('../../../images/resume_icon.png'),
          title: '招聘管理',
          url: 'RecruitmentResume',
        },
        {
          icon: require('../../../images/invite_icon.png'),
          title: '邀请面试',
          url: 'FollowPosition',
        },
        {
          icon: require('../../../images/setting_icon.png'),
          title: '设置入职状态',
          url: 'FollowPosition',
        },
        {
          icon: require('../../../images/checked_icon.png'),
          title: '已投递简历',
          url: 'FollowPosition',
        },
      ],
    };
  }
  render() {
    return (
      <ScrollView>
        <View style={[baseStyle.bgWhite, {height: baseStyle.screenHeight}]}>
          <Header isHeader={false} />
          <ImageBackground
            style={sty.headSty}
            source={require('../../../images/recruitment_management_bg.png')}>
            <Text
              style={[
                baseStyle.textWhite,
                {fontSize: 25, fontWeight: 'bold', textAlign: 'center'},
              ]}>
              大型招聘
            </Text>
            <Text
              style={[
                baseStyle.textWhite,
                {fontSize: 15, textAlign: 'center', marginTop: 5},
              ]}>
              百万人才库 在线交流
            </Text>
          </ImageBackground>
          <View style={{padding: 10}}>
            {this.state.menuList.map((item, idx) => {
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

export default RecruitmentManagement;

const sty = StyleSheet.create({
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
    height: 83.5,
    resizeMode: 'contain',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
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
});
