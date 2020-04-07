import React, {Component} from 'react';
import {Image, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {Tab} from 'beeshell';
import {baseStyle} from '../../components/baseStyle';
import {sty} from './sty';
import {setStatusBar} from '../../components/setStatusBar';
import Header from '../../components/Header';

class Banner extends Component {
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
    });
  };
  render() {
    const renderList = [];
    return (
      <View>
        <Tab
          style={sty.tabContent}
          value={this.state.value}
          scrollable={true}
          data={[{value: 1, label: '咨询'}, {value: 2, label: '热门话题'}]}
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
    };
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
                  this.setState({
                    cardNum: 1,
                  });
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
                  this.setState({
                    cardNum: 2,
                  });
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
                debugger;
                this.state.cardNum === 1
                  ? navigate('ChallengePosition')
                  : navigate('RecommendPosition');
              }}>
              <Text style={baseStyle.textYellow}>更多</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigate('PositionDetail');
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
                source={require('../../images/position_1.png')}
              />
              <View style={{paddingLeft: 15}}>
                <Text style={baseStyle.positionTitle}>人力资源主管</Text>
                <Text style={[baseStyle.ft13, baseStyle.textGray]}>
                  上海汇之余服饰有限公司
                </Text>
                <View style={[baseStyle.row, {marginTop: 3}]}>
                  <View style={sty.positionTag}>
                    <Text style={sty.textGray}>上海宝山区</Text>
                  </View>
                  <View style={sty.positionTag}>
                    <Text style={sty.textGray}>1-3年</Text>
                  </View>
                  <View style={sty.positionTag}>
                    <Text style={sty.textGray}>本科</Text>
                  </View>
                </View>
              </View>
            </View>
            <View>
              <Text style={[{color: '#AC3E40'}, baseStyle.fontBold]}>
                18-20K
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

@setStatusBar({
  // barStyle: 'light-content',
  translucent: true,
  backgroundColor: 'transparent',
})
class Home extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <ScrollView style={baseStyle.bgWhite}>
        <Header isHeader={false} />
        <Banner />
        <View style={{backgroundColor: '#fff'}}>
          <Notice />
          <TabContent />
          <PositionList navigate={this.props.navigation} />
        </View>
      </ScrollView>
    );
  }
}
export default Home;
