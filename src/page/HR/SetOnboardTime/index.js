import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {setStatusBar} from '../../../components/setStatusBar';
import Header from '../../../components/Header';
import {baseStyle} from '../../../components/baseStyle';
import Iconright from '../../../iconfont/Iconright';
import {Longlist} from 'beeshell/dist/components/Longlist';
import DatePicker from '../../../components/DatePicker';
import {Dialog} from 'beeshell';

class ItemComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
    };
  }

  render() {
    const item = this.props.item;
    const navigation = this.props.navigation;
    return (
      <View>
        <View
          style={[
            baseStyle.flex,
            baseStyle.justifyBetween,
            {paddingBottom: 15, paddingTop: 15, alignItems: 'flex-end'},
          ]}>
          <View style={baseStyle.row}>
            <View style={[baseStyle.authorBox, baseStyle.marginRight]}>
              <Image source={{uri: item.pic}} style={baseStyle.authorImg} />
            </View>
            <View>
              <View style={baseStyle.row}>
                <Text style={[baseStyle.fontBold, baseStyle.ft15]}>
                  {item.name}
                </Text>
                <Text style={[baseStyle.ft13, {marginLeft: 10}]}>
                  {item.positionName}
                </Text>
              </View>
              <View style={[baseStyle.row, baseStyle.paddingTop]}>
                {item.age ? (
                  <Text style={{marginRight: 10, paddingRight: 10}}>
                    {item.age}岁
                  </Text>
                ) : null}
                <Text
                  style={[
                    item.age ? sty.borderLeft : null,
                    {paddingLeft: item.age ? 10 : 0},
                  ]}>
                  {item.experienceName}
                </Text>
                <Text
                  style={[sty.borderLeft, {marginLeft: 10, paddingLeft: 10}]}>
                  {item.cityName}
                  {item.regionName}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}>
            <Text style={[baseStyle.textRed, {paddingBottom: 5}]}>
              {item.positionRecordstatus === 0
                ? '已投递'
                : item.positionRecordstatus === 1
                ? '已邀约'
                : item.positionRecordstatus === 2
                ? '已面试'
                : item.positionRecordstatus === 3
                ? '未面试'
                : item.positionRecordstatus === 4
                ? '拒绝面试'
                : item.positionRecordstatus === 5
                ? '谈薪待入职'
                : item.positionRecordstatus === 6
                ? '已雇佣'
                : item.positionRecordstatus === 7
                ? '过保'
                : item.positionRecordstatus === 8
                ? '入职未过保'
                : ''}
            </Text>
            <Iconright color="#D3CECE" />
          </View>
        </View>
        {item.positionRecordstatus === 5 ? (
          <View
            style={[
              baseStyle.row,
              {justifyContent: 'flex-end', marginTop: 10},
            ]}>
            <TouchableOpacity
              onPress={() => {
                // this.props.datePickerRef();
                navigation.navigate('OnboardingSet', {
                  positionRecordId: item.positionRecordId,
                  callBack: () => {
                    this.props.refresh();
                  },
                });
              }}
              style={sty.buttonSty}>
              <Text style={baseStyle.textYellow}>设置入职时间</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }
}

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class SetOnboardTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null,
      page: 1,
      total: 0,
      positionId: null,
      positionRecordId: null,
      update: {
        msg: '',
      },
    };
  }
  UNSAFE_componentWillMount() {
    const positionId = this.props.navigation.getParam('positionId');
    this.setState({
      positionId,
    });
    global.localStorage.get({key: 'currentUser'}).then(res => {
      this.setState({
        currentUser: res,
      });
      this.getPositiontypeList();
    });
  }
  getPositiontypeList() {
    global.httpGet(
      'positionrecord/list',
      {
        page: 1,
        size: 10,
        recordStatus: 4,
        // positionId: this.state.positionId,
        hruserId: this.state.currentUser.userId,
      },
      res => {
        console.log('res.data.result', res.data.result);
        this.setState({
          list: res.data.result,
        });
      },
    );
  }
  refresh() {
    return global
      .httpGetPromise('positionrecord/list', {
        page: this.state.page,
        size: 10,
        recordStatus: 4,
        hruserId: this.state.currentUser.userId,
      })
      .then(res => {
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
  updatePositionRecord() {
    const {positionRecordId, status} = this.state.update;
    const params = {
      id: positionRecordId,
      status: status,
    };
    console.log(params);
    this.positionrecordUpdate(params);
  }
  positionrecordUpdate(params) {
    global.httpPost(
      'positionrecord/update',
      params,
      res => {
        console.log(res);
        this.refresh();
        this._dialog.close();
        // Alert.alert('', '操作成功');
      },
      err => {
        console.log(err);
      },
    );
  }
  render() {
    const {total, list} = this.state;
    if (!list) {
      return false;
    }
    console.log('list', list);
    return (
      <View
        style={[
          // baseStyle.content,
          {flex: 1, backgroundColor: '#fff'},
        ]}>
        <Header
          title="设置入职时间"
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
          fullScreen
        />
        <Longlist
          ref={longList => {
            this.longList = longList;
          }}
          style={[baseStyle.content, {flex: 1}]}
          total={total}
          data={list}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Rreview', {
                    id: item.resumeId,
                  });
                }}
                style={baseStyle.borderBottom}
                key={item.id}>
                <ItemComp
                  updatePositionRecord={res => {
                    this.setState({
                      update: {
                        positionRecordId: item.positionRecordId,
                        status: res.status,
                        msg: res.msg,
                      },
                    });
                    this._dialog.open();
                  }}
                  refresh={() => {
                    this.refresh();
                  }}
                  datePickerRef={() => {
                    this.setState({
                      positionRecordId: item.positionRecordId,
                    });
                    this.datePickerRef.open({
                      value: new Date(),
                    });
                  }}
                  item={item}
                  navigation={this.props.navigation}
                />
              </TouchableOpacity>
            );
          }}
          onEndReached={() => {
            const page = this.state.page + 1;
            this.setState({
              page: page,
            });
            return this.refresh();
          }}
          onRefresh={() => {
            this.setState({
              page: 1,
            });
            return this.refresh();
          }}
        />
        <DatePicker
          ref={res => {
            this.datePickerRef = res;
          }}
          type="month"
          rightCallback={({date, key}) => {
            // this.setParams(key, date);
            this.positionrecordUpdate({
              id: this.state.positionRecordId,
              entryDate: date,
            });
          }}
        />
        <Dialog
          ref={c => {
            this._dialog = c;
          }}
          cancelable={true}
          title="提示"
          bodyText={this.state.update.msg}
          cancelCallback={() => {
            this._dialog.close();
          }}
          confirmCallback={() => {
            this.updatePositionRecord();
            console.log('confirm');
          }}
        />
      </View>
    );
  }
}

export default SetOnboardTime;

const sty = StyleSheet.create({
  borderLeft: {
    borderLeftWidth: 0.5,
    borderLeftColor: '#979797',
  },
  author: {
    width: 47,
    height: 47,
  },
  buttonSty: {
    borderColor: '#D9B06F',
    borderWidth: 0.5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 10,
    marginBottom: 10,
  },
});
