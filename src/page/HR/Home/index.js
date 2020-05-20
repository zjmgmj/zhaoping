import React, {Component} from 'react';
import {
  Image,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
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
      params: {
        page: 1,
        size: 10,
        // userId: currentUser.userId,
        // positionType: type,
      },
      getPositiontypeListFun: card => {
        return this.getPositiontypeList(card);
      },
      filterNum: null,
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
  componentDidMount() {
    // 注册事件通知
    DeviceEventEmitter.emit('tabName');
    //tabName:通知的名称 param：发送的消息（传参）
  }
  getPositiontypeList(type) {
    this.setState({
      positionType: type,
    });
    const currentUser = this.state.currentUser;
    const params = this.state.params;
    params.userId = currentUser.userId;
    debugger;
    params.positionType = type;
    Object.keys(params).forEach(key => {
      if (!params[key]) {
        delete params[key];
      }
    });
    console.log('params', params);
    global.httpGet('position/list', params, res => {
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
          isRegion={false}
          close={() => {
            TopviewGetInstance().remove(this.state.cityPickId);
            this.setState({
              cityPickId: null,
            });
          }}
          selectedEvent={res => {
            const params = Object.assign(this.state.params, res);
            this.setState({
              params,
            });
            this.getPositiontypeList(this.state.cardNum);
            TopviewGetInstance().remove(this.state.cityPickId);
            this.setState({
              cityPickId: null,
            });
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
                  this.setState({
                    cardNum: 1,
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
                  猎头职位
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    cardNum: 2,
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
                  普通职位
                </Text>
              </TouchableOpacity>
            </View>
            <View style={baseStyle.row}>
              <TouchableOpacity
                onPress={() => {
                  if (this.state.cityPickId) {
                    TopviewGetInstance().remove(this.state.cityPickId);
                    this.setState({
                      cityPickId: null,
                    });
                  } else {
                    this.openCityPick();
                  }
                }}
                style={baseStyle.row}>
                <Text style={{paddingRight: 5}}>
                  {this.state.params.cityName
                    ? this.state.params.cityName
                    : '城市'}
                </Text>
                <IconjiantouDown color="#B0ADAD" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigate('PositionFilter', {
                    filter: this.state.params,
                    callBack: res => {
                      console.log('rescallBack', res);
                      let filterNum = 0;
                      Object.keys(res).forEach(key => {
                        if (res[key]) {
                          filterNum++;
                        }
                      });
                      const params = this.state.params;
                      Object.assign(params, res);
                      this.setState({
                        params: params,
                        filterNum: filterNum,
                      });
                      this.getPositiontypeList(this.state.cardNum, params);
                    },
                  });
                }}
                style={[baseStyle.paddingLeft, baseStyle.row]}>
                <Text style={{paddingRight: 5}}>筛选</Text>
                {this.state.filterNum ? (
                  <View style={sty.tag}>
                    <Text style={[baseStyle.textWhite, {textAlign: 'center'}]}>
                      {this.state.filterNum}
                    </Text>
                  </View>
                ) : null}
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
                      navigate('PositionDetail', {
                        id: item.id,
                        companyId: item.companyId,
                      });
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
                              <Text style={sty.textGray}>
                                {item.cityName}
                                {item.regionName}
                              </Text>
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
      <View style={(baseStyle.bgWhite, {flex: 1})}>
        <Header isHeader={false} />
        <ScrollView>
          <Banner />
          <View style={{backgroundColor: '#fff'}}>
            <PositionList
              // onTab={val => {
              //   this.getPositiontypeList(val);
              // }}
              ref={ref => {
                this.positionList = ref;
              }}
              navigate={this.props.navigation}
            />
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('PostPosition', {
              callBack: () => {
                console.log('this.positionList', this.positionList);
                this.positionList.state.getPositiontypeListFun(
                  this.positionList.state.cardNum,
                );
              },
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
