import React, {Component} from 'react';
import {Image, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {setStatusBar} from '../../../components/setStatusBar';
import {TopviewGetInstance} from 'beeshell';
import {baseStyle} from '../../../components/baseStyle';
import {sty} from './sty';
import Header from '../../../components/Header';
import IconjiantouDown from '../../../iconfont/IconjiantouDown';
import CitySelected from '../../../components/CitySelected';

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

class PositionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNum: 1,
      list: [],
      positionList_1: [],
      positionList_2: [],
      cityPickId: null,
      params: {},
    };
  }
  UNSAFE_componentWillMount() {
    global.localStorage.get({key: 'currentUser'}).then(res => {
      this.setState({
        currentUser: res,
        positionType: 1,
      });
      this.getPositiontypeList(1);
    });
  }
  getPositiontypeList(type, params) {
    this.setState({
      positionType: type,
    });

    const currentUser = this.state.currentUser;
    const obj = {
      page: 1,
      size: 10,
      userId: currentUser.userId,
      positionType: type,
    };
    let param = obj;
    if (params) {
      Object.keys(params).forEach(key => {
        params[key] = params[key].toString();
      });
      param = Object.assign(obj, params);
    }
    console.log('param', param);
    global.httpGet('position/list', param, res => {
      const obj = {};
      obj[`positionList_${type}`] = res.data.result;
      this.setState({
        list: res.data.result,
      });
      console.log('getPositiontypeList', res);
    });
  }
  openCityPick() {
    const {provinceId, cityId} = this.state.params;
    const selected = {
      provinceId: provinceId || '',
      cityId: cityId || '',
    };
    TopviewGetInstance()
      .add(
        <CitySelected
          selected={selected}
          close={() => {
            TopviewGetInstance().remove(this.state.cityPickId);
          }}
          selectedEvent={res => {
            const params = Object.assign(this.state.params, res);
            this.setState({
              params,
            });
            this.getPositiontypeList(this.state.cardNum, params);
            TopviewGetInstance().remove(this.state.cityPickId);
          }}
        />,
      )
      .then(id => {
        this.setState({
          cityPickId: id,
        });
      });
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
                  // this.props.onTab(1);
                  this.setState({
                    cardNum: 1,
                    // list: this.props.positionList_1,
                  });
                  this.getPositiontypeList(1);
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
                  // this.props.onTab(2);
                  this.setState({
                    cardNum: 2,
                    // list: this.props.positionList_2,
                  });
                  this.getPositiontypeList(2);
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
              <TouchableOpacity
                onPress={() => {
                  this.openCityPick();
                }}
                style={baseStyle.row}>
                <Text style={{paddingRight: 5}}>城市</Text>
                <IconjiantouDown color="#B0ADAD" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigate('PositionFilter', {
                    callBack: res => {
                      console.log('res', res);
                      this.getPositiontypeList(this.state.cardNum, res);
                    },
                  });
                }}
                style={[baseStyle.paddingLeft, baseStyle.row]}>
                <Text style={{paddingRight: 5}}>筛选</Text>
                <IconjiantouDown color="#B0ADAD" />
              </TouchableOpacity>
            </View>
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
                        {item.salaryName}
                      </Text>
                      <Text style={baseStyle.textYellow}>分享职位链接</Text>
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
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      positionList_1: [],
      positionList_2: [],
    };
  }

  render() {
    return (
      <View style={(baseStyle.bgWhite, {height: baseStyle.screenHeight})}>
        <Header isHeader={false} />
        <ScrollView>
          <Banner />
          <View style={{backgroundColor: '#fff'}}>
            <PositionList
              // onTab={val => {
              //   this.getPositiontypeList(val);
              // }}
              navigate={this.props.navigation}
            />
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('PostPosition', {
              callBack: () => {},
            });
          }}
          style={{position: 'absolute', bottom: 64, right: 20}}>
          <Image
            source={require('../../../images/fb_icon.png')}
            style={sty.addIcon}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
export default Home;
