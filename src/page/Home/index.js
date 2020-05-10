import React, {Component} from 'react';
import {Image, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {Tab} from 'beeshell';
import {baseStyle} from '../../components/baseStyle';
import {sty} from './sty';
import {setStatusBar} from '../../components/setStatusBar';
import Header from '../../components/Header';
import {httpGet} from '../../utils/httpUtil';

class Banner extends Component {
  UNSAFE_componentWillMount() {
    httpGet(
      'turns/getturnslist',
      {},
      res => {
        console.log('getturnslist', res);
      },
      err => {
        console.log(err);
      },
    );
  }
  render() {
    return (
      <View style={sty.banner}>
        <Image
          source={require('../../images/banner.png')}
          style={sty.bannerImg}
        />
      </View>
    );
  }
}

class Notice extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={sty.notice}>
        <Image source={require('../../images/horn.png')} style={sty.hornImg} />
        <Text style={sty.noticeStyle}>189****7890 获得奖金1000元</Text>
      </View>
    );
  }
}

class TabContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    };
  }
  handleChange = (key, value) => {
    this.setState({
      value: value,
      currentUser: null,
    });
  };
  UNSAFE_componentWillMount() {
    this.getNewList();
  }
  getNewList() {
    httpGet(
      'news/list',
      {page: 1, size: 2},
      res => {
        console.log('newsList', res);
      },
      err => {
        console.log('newsListErr', err);
      },
    );
  }
  render() {
    const renderList = [];
    return (
      <View>
        <Tab
          style={sty.tabContent}
          value={this.state.value}
          scrollable={true}
          data={[{value: 1, label: '原创'}, {value: 2, label: '热门话题'}]}
          activeColor="#D9B06F"
          onChange={item => this.handleChange('value', item.value)}
        />
        <View style={{paddingLeft: 20, paddingRight: 20}}>
          {this.state.value === 1 ? (
            <View>
              <View style={[sty.newItem, baseStyle.borderBottom]}>
                <Image
                  source={require('../../images/home_1.png')}
                  style={sty.hotImg}
                />
                <View style={{paddingLeft: 10, flex: 1}}>
                  <Text style={(baseStyle.ft14, baseStyle.fontBold)}>
                    2020年就业趋势调研报告
                  </Text>
                  <Text style={sty.newDetail}>
                    突如其来的新冠肺炎疫情打乱了人们的生活，漫长的“宅家”和延迟复工让职场人的职业规划发生了变化
                  </Text>
                </View>
              </View>
              <View style={sty.newItem}>
                <Image
                  source={require('../../images/home_1.png')}
                  style={sty.hotImg}
                />
                <View style={{paddingLeft: 10, flex: 1}}>
                  <Text style={(baseStyle.ft14, baseStyle.fontBold)}>
                    2020年就业趋势调研报告
                  </Text>
                  <Text style={sty.newDetail}>
                    突如其来的新冠肺炎疫情打乱了人们的生活，漫长的“宅家”和延迟复工让职场人的职业规划发生了变化
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <View>
              <View
                style={[
                  sty.newItem,
                  {borderBottomWidth: 1, borderBottomColor: '#ccc'},
                ]}>
                <Image
                  source={require('../../images/home_1.png')}
                  style={sty.hotImg}
                />
                <View style={{paddingLeft: 10, flex: 1}}>
                  <Text style={(baseStyle.ft14, baseStyle.fontBold)}>
                    2020年就业趋势调研报告
                  </Text>
                  <Text style={sty.newDetail}>
                    突如其来的新冠肺炎疫情打乱了人们的生活，漫长的“宅家”和延迟复工让职场人的职业规划发生了变化
                  </Text>
                </View>
              </View>
              <View style={sty.newItem}>
                <Image
                  source={require('../../images/home_1.png')}
                  style={sty.hotImg}
                />
                <View style={{paddingLeft: 10, flex: 1}}>
                  <Text style={(baseStyle.ft14, baseStyle.fontBold)}>
                    2020年就业趋势调研报告
                  </Text>
                  <Text style={sty.newDetail}>
                    突如其来的新冠肺炎疫情打乱了人们的生活，漫长的“宅家”和延迟复工让职场人的职业规划发生了变化
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
}

class PositionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNum: 1,
      list: [],
    };
  }
  // UNSAFE_componentWillMount() {
  //   this.getPositiontypeList();
  // }
  componentDidMount() {
    this.getPositiontypeList();
  }
  getSalaryName(id) {
    console.log('this.props.salaryList', this.props.salaryList);
    const resSalary = this.props.salaryList.find(item => {
      return item.id === id;
    });
    if (resSalary) {
      return resSalary.dvalue;
    } else {
      return '';
    }
  }
  getPositiontypeList(cardActive) {
    const currentUser = this.props.currentUser;
    const params = {
      page: 1,
      size: 10,
      userId: currentUser.userId,
      // positionType: 1,
    };
    if (cardActive === 2) {
      params.isrecommend = 1;
    }
    console.log('params', params);
    global.httpGet('position/list', params, res => {
      console.log('positionList', res);
      this.setState({
        list: res.data.result,
      });
      console.log('getPositiontypeList', res);
    });
  }
  cardHandler(cardNum) {
    this.setState({
      cardNum: cardNum,
    });
    this.getPositiontypeList(cardNum);
  }
  render() {
    const navigate = this.props.navigate.navigate;
    return (
      <View>
        <View style={{padding: 15, paddingBottom: 0}}>
          <View
            style={[baseStyle.row, sty.positionTab, baseStyle.borderBottom]}>
            <View style={baseStyle.row}>
              <TouchableOpacity
                onPress={() => {
                  this.cardHandler(1);
                }}
                style={[
                  sty.tabName,
                  this.state.cardNum === 1 ? sty.tabNameActive : '',
                ]}>
                <Text
                  style={
                    this.state.cardNum === 1
                      ? baseStyle.textBlack
                      : baseStyle.textGray
                  }>
                  挑战职位
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.cardHandler(2);
                }}
                style={[
                  sty.tabName,
                  this.state.cardNum === 2 ? sty.tabNameActive : '',
                ]}>
                <Text
                  style={
                    this.state.cardNum === 2
                      ? baseStyle.textBlack
                      : baseStyle.textGray
                  }>
                  推荐职位
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.state.cardNum === 1
                  ? navigate('ChallengePosition')
                  : navigate('RecommendPosition');
              }}>
              <Text style={baseStyle.textYellow}>更多</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          {this.state.list.length > 0
            ? this.state.list.map(item => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      navigate('PositionDetail', {id: item.id});
                    }}
                    style={[
                      baseStyle.borderBottom,
                      sty.positionItem,
                      baseStyle.flex,
                      baseStyle.justifyBetween,
                    ]}>
                    <View style={[baseStyle.row, {flex: 1}]}>
                      <Image
                        style={sty.positionImg}
                        source={{uri: item.logo}}
                      />
                      <View style={{paddingLeft: 15}}>
                        <Text style={baseStyle.positionTitle}>
                          {item.positionName}
                        </Text>
                        <Text style={[baseStyle.ft13, baseStyle.textGray]}>
                          {item.companyName}
                        </Text>
                        <View style={[baseStyle.row, {marginTop: 3}]}>
                          {item.cityName ? (
                            <View style={sty.positionTag}>
                              <Text style={sty.textGray}>{item.cityName}</Text>
                            </View>
                          ) : null}
                          {item.experienceName ? (
                            <View style={sty.positionTag}>
                              <Text style={sty.textGray}>
                                {item.experienceName}
                              </Text>
                            </View>
                          ) : null}
                          {item.educationName ? (
                            <View style={sty.positionTag}>
                              <Text style={sty.textGray}>
                                {item.educationName}
                              </Text>
                            </View>
                          ) : null}
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                      }}>
                      <Text style={[{color: '#AC3E40'}, baseStyle.fontBold]}>
                        {/* 18-20K */}
                        {this.getSalaryName(item.salaryId)}
                      </Text>
                      {/* <Text style={baseStyle.textYellow}>分享职位链接</Text> */}
                    </View>
                  </TouchableOpacity>
                );
              })
            : null}
        </View>
      </View>
    );
  }
}

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class Home extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
      salaryList: [],
    };
  }
  UNSAFE_componentWillMount() {
    global.gettypelist('salary', res => {
      // 年薪
      this.setState({
        salaryList: res.data,
      });
    });
  }
  componentDidMount() {
    global.localStorage.get({key: 'currentUser'}).then(res => {
      this.setState({
        currentUser: res,
      });
    });
  }
  render() {
    return (
      <ScrollView style={baseStyle.bgWhite}>
        <Header isHeader={false} />
        <Banner />
        <View style={{backgroundColor: '#fff'}}>
          <Notice />
          <TabContent />
          {this.state.currentUser ? (
            <PositionList
              salaryList={this.state.salaryList}
              currentUser={this.state.currentUser}
              navigate={this.props.navigation}
            />
          ) : null}
        </View>
      </ScrollView>
    );
  }
}
export default Home;
