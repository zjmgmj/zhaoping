import React, {Component} from 'react';
import {Text, View, ScrollView, Alert} from 'react-native';
import {setStatusBar} from '../../../components/setStatusBar';
import Header from '../../../components/Header';
import Item from './item';
import {baseStyle} from '../../../components/baseStyle';
import {Longlist} from 'beeshell/dist/components/Longlist';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class RecruitmentResume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      total: 0,
      page: 1,
    };
  }
  UNSAFE_componentWillMount() {
    global.localStorage.get({key: 'currentUser'}).then(res => {
      this.setState({
        currentUser: res,
      });
      this.getPositiontypeList();
    });
  }
  getPositiontypeList() {
    const currentUser = this.state.currentUser;
    global.httpGet(
      'position/list',
      {
        page: 1,
        size: 10,
        // positionType: 1,
        userId: currentUser.userId,
      },
      res => {
        this.setState({
          list: res.data.result,
        });
      },
      err => {
        console.log(err);
      },
    );
  }
  refresh() {
    return global
      .httpGetPromise('position/list', {
        page: this.state.page,
        size: 10,
        // positionType: 1,
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
  updatePositionRecord(item, resumeTemp) {
    const params = {
      id: item.id,
      // userId: item.userId,
      // status: item.status,
      resumeTemp: resumeTemp,
    };
    console.log('params------', params);
    global.httpPost(
      'position/update',
      params,
      res => {
        console.log(res);
        Alert.alert('', '上传模板成功');
      },
      err => {
        console.log(err);
      },
    );
  }
  render() {
    const {total, list} = this.state;
    return (
      <View style={[{flex: 1, backgroundColor: '#fff'}]}>
        <Header
          title="招聘管理"
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
          fullScreen
          isBorder={false}
        />
        <Longlist
          ref={longList => {
            this.longList = longList;
          }}
          total={total}
          data={list}
          renderItem={({item, index}) => {
            return (
              <View
                key={item.id}
                style={{marginBottom: 10, backgroundColor: '#fff'}}>
                <Item
                  updatePositionRecord={path => {
                    console.log('updatePositionRecord', item);
                    this.updatePositionRecord(item, path);
                  }}
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
      </View>
    );
  }
}

export default RecruitmentResume;
