import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {baseStyle} from '../../components/baseStyle';
import {Longlist} from 'beeshell/dist/components/Longlist';
import Header from '../../components/Header';
import {setStatusBar} from '../../components/setStatusBar';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class InterviewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      total: 0,
      page: 1,
      list: [],
      positionId: null,
    };
  }
  UNSAFE_componentWillMount() {
    this.setState({
      positionId: this.props.navigation.getParam('positionId'),
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
    const positionId = this.state.positionId;
    const obj = {
      page: 1,
      size: 10,
      positionId: positionId,
    };
    const params = Object.assign(obj, param);
    global.httpGet('position/getintfeedbacklist', params, res => {
      this.setState({
        list: res.data.result,
        total: res.total,
      });
      console.log('getPositiontypeList', res);
    });
  }
  refresh() {
    const positionId = this.state.positionId;
    const params = {
      page: this.state.page,
      size: 10,
      positionId: positionId,
    };
    return global
      .httpGetPromise('position/getintfeedbacklist', params)
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
  render() {
    const total = this.state.total;
    const list = this.state.list;
    return (
      <View style={{backgroundColor: '#fff'}}>
        <Header
          title="面试经"
          fullScreen
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <View style={[baseStyle.content, {height: baseStyle.screenHeight}]}>
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
                  style={[
                    baseStyle.borderBottom,
                    baseStyle.paddingBottom,
                    baseStyle.paddingTop,
                  ]}>
                  <View style={baseStyle.row}>
                    <View style={baseStyle.authorBox}>
                      <Image
                        source={{uri: item.userPic}}
                        style={baseStyle.authorImg}
                      />
                    </View>
                    <Text style={[baseStyle.paddingLeft, baseStyle.authorName]}>
                      {item.isanonymous ? '匿名用户' : item.userNickname}
                    </Text>
                  </View>
                  <Text style={baseStyle.paddingTop}>{item.intfeedback}</Text>
                </View>
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
      </View>
    );
  }
}

export default InterviewList;

const sty = StyleSheet.create({
  subBtn: {
    paddingLeft: 0,
    paddingRight: 0,
    height: 40,
    marginLeft: 5,
    borderRadius: 3,
  },
  headSty: {
    width: baseStyle.screenWidth,
    height: 89,
    resizeMode: 'contain',
  },
  authorImg: {
    width: 60,
    height: 60,
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
  attentionBtn: {
    borderColor: '#D9B06F',
    borderRadius: 15,
    borderWidth: 0.5,
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
  modalBox: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: baseStyle.screenWidth,
    height: baseStyle.screenHeight,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  shareBox: {
    backgroundColor: '#fff',
    width: 297,
    paddingBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  shareBoxTitle: {
    position: 'absolute',
    top: -15,
    backgroundColor: '#D9B06F',
    width: 112,
    padding: 5,
    left: 87.5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
