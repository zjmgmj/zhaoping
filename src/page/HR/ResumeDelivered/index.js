import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  PixelRatio,
  Text,
  ScrollView,
  TextInput,
} from 'react-native';
import {Button} from 'beeshell/dist/components/Button';
import Header from '../../../components/Header';
import {setStatusBar} from '../../../components/setStatusBar';
import {baseStyle} from '../../../components/baseStyle';
// import editResume from './editResume';
import Iconright from '../../../iconfont/Iconright';
import Iconsearch from '../../../iconfont/Iconsearch';

class NotData extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={sty.notDataBox}>
        <View>
          <Image
            style={sty.notDataImg}
            source={require('../../../images/not_data.png')}
          />
        </View>
        <View>
          <View style={sty.notDataMsg}>
            <Text>当前暂时无简历</Text>
          </View>
        </View>
      </View>
    );
  }
}

class ResumeItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const item = this.props.item;
    return (
      <View
        style={[
          baseStyle.row,
          baseStyle.justifyBetween,
          baseStyle.borderBottom,
          baseStyle.paddingBottom,
          baseStyle.paddingTop,
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
                {item.resumeIntention}
              </Text>
            </View>
            <View style={[baseStyle.row, baseStyle.paddingTop]}>
              {item.age ? <Text>{item.age}岁</Text> : null}
              {item.experienceName ? (
                <Text
                  style={[
                    item.age ? sty.borderLeft : null,
                    {marginLeft: item.age ? 10 : 0, paddingLeft: 10},
                  ]}>
                  {item.experienceName}
                </Text>
              ) : null}
              {item.cityName ? (
                <Text
                  style={[sty.borderLeft, {marginLeft: 10, paddingLeft: 10}]}>
                  {item.cityName}
                  {item.regionName}
                </Text>
              ) : null}
            </View>
          </View>
        </View>
        <Iconright color="#D3CECE" />
      </View>
    );
  }
}

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class ResumeDelivered extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgSource: [],
      videoSource: null,
      list: null,
      currentUser: null,
      searchVal: '',
    };
  }
  UNSAFE_componentWillMount() {
    global.localStorage.get({key: 'currentUser'}).then(res => {
      this.setState({
        currentUser: res,
      });
      this.getResumeList();
    });
  }
  getResumeList() {
    global.httpGet(
      'positionrecord/list',
      {
        page: 1,
        size: 20,
        hruserId: this.state.currentUser.userId,
      },
      res => {
        console.log('positionrecord', res);
        this.setState({
          list: res.data.result,
        });
      },
      err => {
        console.log(err);
      },
    );
  }
  render() {
    const list = this.state.list;
    if (!list) {
      return false;
    }
    return (
      <View style={[baseStyle.bgWhite, {flex: 1}]}>
        <Header
          fullScreen
          title="已投递简历"
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
        />
        {/* <View style={baseStyle.content}>
          <View style={[baseStyle.row, sty.searchBox]}>
            <Iconsearch />
            <TextInput
              placeholder="搜索职位"
              value={this.state.searchVal}
              style={[baseStyle.paddingLeft, {flex: 1}]}
              onChange={e => {
                this.setState({
                  searchVal: e.nativeEvent.text,
                });
              }}
              onEndEditing={res => {
                console.log('onEndEditing', res);
                // console.log(searchVal)
              }}
            />
          </View>
        </View> */}
        <View style={[{flex: 1}]}>
          {list.length > 0 ? (
            <ScrollView style={{flex: 1, paddingLeft: 10, paddingRight: 10}}>
              {list.map(item => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      this.props.navigation.navigate('Rreview', {
                        id: item.resumeId,
                      });
                    }}>
                    <ResumeItem item={item} />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          ) : (
            <NotData />
          )}
        </View>
      </View>
    );
  }
}

export default ResumeDelivered;
const sty = StyleSheet.create({
  borderLeft: {
    borderLeftWidth: 0.5,
    borderLeftColor: '#979797',
  },
  author: {
    width: 47,
    height: 47,
    resizeMode: 'cover',
  },
  notDataBox: {
    paddingTop: 100,
    height: baseStyle.screenHeight,
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  notDataMsg: {
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  notDataBtn: {
    borderRadius: 5,
    width: 300,
  },
  notDataImg: {
    width: 91.5,
    height: 84.5,
  },
  searchBox: {
    backgroundColor: '#FBF8F2',
    borderRadius: 20,
    paddingLeft: 15,
    paddingRight: 15,
    height: 40,
  },
});
