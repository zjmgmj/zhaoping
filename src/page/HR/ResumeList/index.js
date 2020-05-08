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
            {paddingBottom: 5, paddingTop: 10, alignItems: 'flex-end'},
          ]}>
          <View style={baseStyle.row}>
            <Image style={sty.author} source={{uri: item.pic}} />
            <View style={baseStyle.paddingLeft}>
              <Text style={{marginBottom: 5}}>{item.name}</Text>
              <Text>{item.resumeIntention}</Text>
              {/* <Text>市场经理 | 互联网价值观</Text> */}
            </View>
          </View>
          <Iconright color="#D3CECE" />
        </View>
        {item.positionRecordstatus === 0 ? (
          <View
            style={[
              baseStyle.row,
              {justifyContent: 'flex-end', marginTop: 10},
            ]}>
            <TouchableOpacity
              onPress={() => {
                console.log('----');
                // this.props.refuse();
                navigation.navigate('Refuse', {
                  positionRecordId: item.positionRecordId,
                  callBack: () => {
                    this.props.refresh();
                  },
                });
              }}
              style={sty.buttonSty}>
              <Text style={baseStyle.textYellow}>拒绝面试</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.updatePositionRecord(1);
              }}
              style={sty.buttonSty}>
              <Text style={baseStyle.textYellow}>邀请面试</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // this.props.updatePositionRecord(item.userId);
                console.log('查看简历模板');
              }}
              style={sty.buttonSty}>
              <Text style={baseStyle.textYellow}>查看简历模板</Text>
            </TouchableOpacity>
          </View>
        ) : item.positionRecordstatus === 1 ? (
          <View
            style={[
              baseStyle.row,
              {justifyContent: 'flex-end', marginTop: 10},
            ]}>
            <TouchableOpacity
              onPress={() => {
                console.log('----');
                this.props.updatePositionRecord(2);
              }}
              style={sty.buttonSty}>
              <Text style={baseStyle.textYellow}>已面试</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                console.log('----');
                this.props.updatePositionRecord(3);
              }}
              style={sty.buttonSty}>
              <Text style={baseStyle.textYellow}>未面试</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                console.log('----');
                this.props.updatePositionRecord(4);
              }}
              style={sty.buttonSty}>
              <Text style={baseStyle.textYellow}>拒绝面试</Text>
            </TouchableOpacity>
          </View>
        ) : item.positionRecordstatus === 2 ? (
          <View
            style={[
              baseStyle.row,
              {justifyContent: 'flex-end', marginTop: 10},
            ]}>
            <TouchableOpacity
              onPress={() => {
                console.log('----');
                this.props.updatePositionRecord(6);
              }}
              style={sty.buttonSty}>
              <Text style={baseStyle.textYellow}>确认录用</Text>
            </TouchableOpacity>
          </View>
        ) : item.positionRecordstatus === 6 ? (
          <View
            style={[
              baseStyle.row,
              {justifyContent: 'flex-end', marginTop: 10},
            ]}>
            <TouchableOpacity
              onPress={() => {
                console.log('----');
                // this.props.updatePositionRecord(6);
                navigation.navigate('Feedback', {
                  positionRecordId: item.positionRecordId,
                  callBack: () => {
                    this.props.refresh();
                  },
                });
              }}
              style={sty.buttonSty}>
              <Text style={baseStyle.textYellow}>上传面试反馈</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                console.log('----');
                // this.props.updatePositionRecord(6);
                this.props.datePickerRef();
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
class ResumeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      page: 1,
      total: 0,
      positionId: null,
      positionRecordId: null,
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
        positionId: this.state.positionId,
        userId: this.state.currentUser.userId,
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
        positionId: this.state.positionId,
        userId: this.state.currentUser.userId,
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
  updatePositionRecord(positionRecordId, status) {
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
        Alert.alert('', '操作成功');
      },
      err => {
        console.log(err);
      },
    );
  }
  render() {
    const {total, list} = this.state;
    return (
      <View style={[baseStyle.content, {flex: 1, backgroundColor: '#fff'}]}>
        <Header
          title="招聘简历"
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
          fullScreen
        />
        <Longlist
          ref={longList => {
            this.longList = longList;
          }}
          total={total}
          data={list}
          renderItem={({item, index}) => {
            return (
              <View style={baseStyle.borderBottom} key={item.id}>
                <ItemComp
                  updatePositionRecord={status => {
                    this.updatePositionRecord(item.positionRecordId, status);
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
                  // refuse={() => {
                  //   this.props.navigation.navigate('Refuse', {
                  //     userId: item.userId,
                  //     positionId: this.state.positionId,
                  //   });
                  // }}
                  item={item}
                  navigation={this.props.navigation}
                />
              </View>
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
      </View>
    );
  }
}

export default ResumeList;

const sty = StyleSheet.create({
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
