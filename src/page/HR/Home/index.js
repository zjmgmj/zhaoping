import React, {Component} from 'react';
import {Image, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {setStatusBar} from '../../../components/setStatusBar';
import {TopviewGetInstance} from 'beeshell';
import {baseStyle} from '../../../components/baseStyle';
import {sty} from './sty';
import Header from '../../../components/Header';
import IconjiantouDown from '../../../iconfont/IconjiantouDown';

class Banner extends Component {
  render() {
    return (
      <View style={sty.banner}>
        <Image
          source={require('../../../images/banner.png')}
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
        <Image
          source={require('../../../images/horn.png')}
          style={sty.hornImg}
        />
        <Text style={sty.noticeStyle}>189****7890 获得奖金1000元</Text>
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
                  普通职位
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
                  内推职位
                </Text>
              </TouchableOpacity>
            </View>
            <View style={baseStyle.row}>
              <View style={baseStyle.row}>
                <Text style={{paddingRight: 5}}>城市</Text>
                <IconjiantouDown color="#B0ADAD" />
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('PositionFilter');
                }}
                style={[baseStyle.paddingLeft, baseStyle.row]}>
                <Text style={{paddingRight: 5}}>筛选</Text>
                <IconjiantouDown color="#B0ADAD" />
              </TouchableOpacity>
            </View>
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
                source={require('../../../images/position_1.png')}
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
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}>
              <Text style={[{color: '#AC3E40'}, baseStyle.fontBold]}>
                18-20K
              </Text>
              <Text style={baseStyle.textYellow}>分享职位链接</Text>
            </View>
          </TouchableOpacity>
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
  constructor(props) {
    super(props);
  }
  // componentDidMount() {
  //   TopviewGetInstance().add(
  //     <TouchableOpacity
  //       onPress={() => {
  //         this.props.openRelease();
  //       }}
  //       style={{position: 'absolute', bottom: 60, right: 20}}>
  //       <Image
  //         source={require('../../../images/add_icon.png')}
  //         style={sty.addIcon}
  //       />
  //     </TouchableOpacity>,
  //   );
  // }
  render() {
    return (
      <View style={(baseStyle.bgWhite, {height: baseStyle.screenHeight})}>
        <Header isHeader={false} />
        <ScrollView>
          <Banner />
          <View style={{backgroundColor: '#fff'}}>
            <Notice />
            <PositionList navigate={this.props.navigation} />
          </View>
        </ScrollView>
        <View style={{position: 'absolute', bottom: 64, right: 20}}>
          <Image
            source={require('../../../images/fb_icon.png')}
            style={sty.addIcon}
          />
        </View>
      </View>
    );
  }
}
export default Home;
