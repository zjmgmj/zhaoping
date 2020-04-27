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

class ItemComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
    };
  }

  render() {
    const item = this.props.item;
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
        <View
          style={[baseStyle.row, {justifyContent: 'flex-end', marginTop: 10}]}>
          <TouchableOpacity
            onPress={() => {
              console.log('----');
              this.props.refuse();
            }}
            style={sty.buttonSty}>
            <Text style={baseStyle.textYellow}>拒绝面试</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.updatePositionRecord(item.userId);
            }}
            style={sty.buttonSty}>
            <Text style={baseStyle.textYellow}>邀请面试</Text>
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
class ResumeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      page: 1,
      total: 0,
      positionId: null,
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
      'resume/getResumeSubmittedList',
      {
        page: 1,
        size: 10,
        positionId: this.state.positionId,
        userId: this.state.currentUser.userId,
      },
      res => {
        this.setState({
          list: res.data.result,
        });
      },
    );
  }
  refresh() {
    return global
      .httpGetPromise('resume/getResumeSubmittedList', {
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
  updatePositionRecord(userId) {
    const params = {
      positionId: this.state.positionId,
      userId: userId,
      status: 1,
    };
    global.httpPost(
      'positionrecord/update',
      params,
      res => {
        console.log(res);
        Alert.alert('', '邀请成功');
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
                  updatePositionRecord={userId => {
                    this.updatePositionRecord(userId);
                  }}
                  refuse={() => {
                    this.props.navigation.navigate('Refuse', {
                      userId: item.userId,
                      positionId: this.state.positionId,
                    });
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
