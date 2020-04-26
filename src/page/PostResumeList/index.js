import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  PixelRatio,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import Header from '../../components/Header';
import {setStatusBar} from '../../components/setStatusBar';
import {baseStyle} from '../../components/baseStyle';
// import editResume from './editResume';
import Icontick from '../../iconfont/Icontick';
import {Radio, Button} from 'beeshell';

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
            source={require('../../images/not_data.png')}
          />
        </View>
        <View>
          <View style={sty.notDataMsg}>
            <Text>当前暂时无简历</Text>
          </View>
          <Button
            style={[sty.notDataBtn, baseStyle.bgYellow]}
            textStyle={baseStyle.textWhite}
            onPress={() => {
              this.props.onPressAdd();
            }}>
            添加简历
          </Button>
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
    const activeId = this.props.activeId;
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
          <Image source={{uri: item.pic}} style={sty.author} />
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
              <Text>{global.getAge(item.birthDate)}岁</Text>
              <Text style={[sty.borderLeft, {marginLeft: 10, paddingLeft: 10}]}>
                工作{item.workyear}年
              </Text>
              {/* <Text style={[sty.borderLeft, {marginLeft: 10, paddingLeft: 10}]}>
                上海长宁区
              </Text> */}
            </View>
          </View>
        </View>
        {activeId === item.id ? <Icontick color="#D9B06F" /> : null}

        {/* <Iconright color="#D3CECE" /> */}
      </View>
    );
  }
}

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class PostResumeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgSource: [],
      videoSource: null,
      list: [],
      currentUser: null,
      activeId: null,
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
      'resume/list',
      {
        page: 1,
        size: 10,
        userId: this.state.currentUser.userId,
      },
      res => {
        console.log('resumeList', res);
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
    return (
      <View style={[baseStyle.bgWhite, {height: baseStyle.screenHeight}]}>
        <Header
          fullScreen
          title="简历列表"
          right="确定"
          onRightPress={() => {
            console.log('---');
            this.props.navigation.state.params.callBack(this.state.activeId);
            this.props.navigation.goBack();
          }}
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
        />
        {list.length > 0 ? (
          <ScrollView style={baseStyle.content}>
            {list.map(item => {
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    this.setState({
                      activeId: item.id,
                    });
                  }}>
                  <ResumeItem activeId={this.state.activeId} item={item} />
                </TouchableOpacity>
              );
            })}
            {/* <Radio
              value={this.state.value}
              iconPosition="right"
              onChange={value => {
                console.log('Radio', value);
                this.setState({
                  value,
                });
              }}>
              {list.map(item => {
                return (
                  <Radio.Item
                    value={item.id}
                    renderItem={() => {
                      return <ResumeItem item={item} />;
                    }}
                  />
                );
              })}
            </Radio> */}
          </ScrollView>
        ) : (
          <NotData
            onPressAdd={() => {
              this.props.navigation.navigate('ResumeAdd', {
                callBack: res => {
                  console.log(res);
                },
              });
            }}
          />
        )}
      </View>
    );
  }
}

export default PostResumeList;
const sty = StyleSheet.create({
  borderLeft: {
    borderLeftWidth: 0.5,
    borderLeftColor: '#979797',
  },
  author: {
    width: 47,
    height: 47,
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
});
