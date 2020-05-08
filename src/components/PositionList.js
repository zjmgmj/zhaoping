import React, {Component} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {baseStyle} from './baseStyle';
import {Longlist} from 'beeshell/dist/components/Longlist';

const sty = StyleSheet.create({
  positionItem: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  positionTitle: {
    fontSize: 20,
  },
  positionImg: {
    width: 53,
    height: 64,
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
});
class PositionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      total: 0,
      page: 1,
      list: [],
      salaryList: [],
      getPositionList: res => {
        return this.getPositiontypeList(res);
      },
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
      this.getPositiontypeList();
    });
  }
  getPositiontypeList(param = {}) {
    const currentUser = this.state.currentUser;
    const obj = {
      page: 1,
      size: 10,
      userId: currentUser.userId,
    };
    const params = Object.assign(obj, param);
    if (this.props.positionType) {
      params.positionType = this.props.positionType;
    }
    if (this.props.isrecommend) {
      params.isrecommend = 1;
    }
    global.httpGet('position/list', params, res => {
      console.log('positionList', res);
      this.setState({
        list: res.data.result,
        total: res.total,
      });
      console.log('getPositiontypeList', res);
    });
  }
  getSalaryName(id) {
    const resSalary = this.state.salaryList.find(item => {
      return item.id === id;
    });
    if (resSalary) {
      return resSalary.dvalue;
    } else {
      return '';
    }
  }
  refresh() {
    const currentUser = this.state.currentUser;
    const params = {
      page: this.state.page,
      size: 10,
      userId: currentUser.userId,
      positionType: this.props.positionType,
    };
    if (this.props.isrecommend) {
      params.isrecommend = 1;
    }
    return global.httpGetPromise('position/list', params).then(res => {
      console.log('res', res);
      const page = this.state.page;
      let oldList = this.state.list;
      const resData = res.data;
      if (page > 1) {
        oldList.push(...resData.result);
      } else {
        oldList = resData.result;
      }
      this.setState({
        list: oldList,
        total: resData.total,
      });
    });
  }
  render() {
    const total = this.state.total;
    const list = this.state.list;
    return (
      <View>
        <Longlist
          ref={longList => {
            this.longList = longList;
          }}
          total={total}
          data={list}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('PositionDetail', {
                    id: item.id,
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
                    source={require('../images/position_1.png')}
                  />
                  <View style={{paddingLeft: 15}}>
                    <Text style={baseStyle.positionTitle}>
                      {item.positionName}
                    </Text>
                    <Text style={[baseStyle.ft13, baseStyle.textGray]}>
                      {item.companyName}
                    </Text>
                    <View
                      style={[
                        baseStyle.row,
                        baseStyle.justifyBetween,
                        {marginTop: 3, width: baseStyle.screenWidth - 85},
                      ]}>
                      <View style={[baseStyle.row]}>
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
                      {/* <Text style={[baseStyle.textGray, baseStyle.ft12]}>
                        HR 7天未查看
                      </Text> */}
                    </View>
                  </View>
                </View>
                <View>
                  <Text style={[{color: '#AC3E40'}, baseStyle.fontBold]}>
                    {this.getSalaryName(item.salaryId)}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          onEndReached={() => {
            const page = this.state.page + 1;
            this.setState({
              page: page,
            });
            console.log('onEndReached');
            return this.refresh();
          }}
          onRefresh={() => {
            console.log('onRefresh');
            this.setState({
              page: 1,
            });
            return this.refresh();
          }}
        />
      </View>
    );
  }
}

export default PositionList;
