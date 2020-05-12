import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
  // SafeAreaView,
} from 'react-native';
import {Button} from 'beeshell/dist/components/Button';
import Header from '../../../components/Header';
import {setStatusBar} from '../../../components/setStatusBar';
import {baseStyle} from '../../../components/baseStyle';

class List extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {navigation, list} = this.props;
    return (
      <View style={[baseStyle.row, {flexWrap: 'wrap', paddingTop: 10}]}>
        {list.map((item, idx) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ProfessionalAdvisers', {
                  detail: item,
                  callBack: res => {
                    console.log(res);
                  },
                });
              }}
              key={idx}
              style={[
                baseStyle.paddingLeft,
                baseStyle.paddingRight,
                baseStyle.paddingTop,
                {width: (baseStyle.screenWidth - 30) / 4},
              ]}>
              <View style={[sty.row, {alignItems: 'center'}]}>
                <View style={sty.authorImgBox}>
                  <Image source={{uri: item.userPic}} style={sty.authorImg} />
                </View>
              </View>
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 5,
                  marginBottom: 5,
                }}>
                {item.housekeeperTitle}
              </Text>
              <Text style={{textAlign: 'center', overflow: 'hidden'}}>
                {item.userNickname}
              </Text>
              {this.props.type !== 1 && item.status === 1 ? (
                <Text
                  style={[
                    baseStyle.textRed,
                    {textAlign: 'center', overflow: 'hidden'},
                  ]}>
                  待审核
                </Text>
              ) : null}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

class NoData extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Image
          style={{width: 68, height: 65, resizeMode: 'contain'}}
          source={require('../../../images/no_data_icon.png')}
        />
        <View style={{paddingLeft: 40, paddingRight: 40}}>
          <Text
            style={[
              baseStyle.textGray,
              {textAlign: 'center', lineHeight: 30, paddingTop: 30},
            ]}>
            当前还没有专属管家哦！ 点击管家头像可以把ta成为自己的专属管家哦
          </Text>
        </View>
      </View>
    );
  }
}

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class Housekeeper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      platformList: [],
      list: [],
    };
  }
  UNSAFE_componentWillMount() {
    global.localStorage.get({key: 'currentUser'}).then(res => {
      this.setState({
        currentUser: res,
      });
      this.getUserList();
      this.getList();
    });
  }
  getUserList(changeIt) {
    const params = {
      page: 1,
      size: 8,
      housekeeperIs: 1,
      changeIt: 1,
    };
    if (changeIt) {
      params.params = changeIt;
    }
    global.httpGet('user/list', params, res => {
      console.log(res);
      if (res.code !== 0) {
        this.setState({
          platformList: res.data || [],
        });
      }
    });
  }
  getList() {
    const params = {
      page: 1,
      size: 10,
      userId: this.state.currentUser.userId,
    };
    global.httpGet('housekeeper/list', params, res => {
      console.log(res);
      this.setState({
        list: res.data.result,
      });
    });
  }
  render() {
    const {list, currentUser, platformList} = this.state;
    if (!currentUser) {
      return false;
    }
    return (
      <View style={[baseStyle.bgWhite]}>
        <Header
          title="专属管家"
          fullScreen
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <ScrollView
          style={[
            {
              height: baseStyle.screenHeight - 35,
              paddingLeft: 10,
              paddingRight: 10,
            },
          ]}>
          <View
            style={[baseStyle.row, baseStyle.justifyBetween, {marginTop: 10}]}>
            <Text style={baseStyle.ft16}>平台推荐管家</Text>
            <TouchableOpacity
              onPress={() => {
                this.getUserList(1);
              }}>
              <Text style={[baseStyle.ft15, baseStyle.textYellow]}>换一批</Text>
            </TouchableOpacity>
          </View>
          <View style={[baseStyle.row, {flexWrap: 'wrap', paddingTop: 10}]}>
            {platformList.length > 0 ? (
              <List
                type={1}
                list={platformList}
                navigation={this.props.navigation}
              />
            ) : null}
          </View>
          <View
            style={[baseStyle.row, baseStyle.justifyBetween, {paddingTop: 30}]}>
            <Text style={baseStyle.ft16}>我的专属管家</Text>
          </View>
          <View style={[baseStyle.row, {flexWrap: 'wrap', paddingTop: 10}]}>
            {list.length > 0 ? (
              <List list={list} navigation={this.props.navigation} />
            ) : (
              <NoData
                navigation={this.props.navigation}
                currentUser={this.state.currentUser}
              />
            )}
          </View>
          <Button
            onPress={() => {
              this.props.navigation.navigate('EntryInfor');
            }}
            style={sty.subBtn}
            textStyle={{color: '#fff'}}>
            申请成为专属管家
          </Button>
        </ScrollView>
      </View>
    );
  }
}
const itemWidth = (baseStyle.screenWidth - 80) / 4;
export default Housekeeper;
const sty = StyleSheet.create({
  playBox: {
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 187.5,
  },
  personText: {
    lineHeight: 25,
    marginTop: 10,
    padding: 10,
  },
  subBtn: {
    backgroundColor: '#D9B06F',
    marginTop: 40,
    marginBottom: 40,
    width: baseStyle.screenWidth - 20,
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
    resizeMode: 'contain',
  },
});
