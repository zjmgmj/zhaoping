import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {baseStyle} from '../../components/baseStyle';
import {TopviewGetInstance} from 'beeshell';
import {Longlist} from 'beeshell/dist/components/Longlist';

class Item extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const item = this.props.item;
    const mainUrlList = item.mainUrl ? item.mainUrl.split() : [];
    return (
      <View style={sty.itemBox}>
        <View style={baseStyle.row}>
          <Image source={{uri: item.userPic}} style={sty.authorImg} />
          <View style={baseStyle.paddingLeft}>
            <Text style={baseStyle.textBlack}>
              {item.userNickname || 'zhjm'}
            </Text>
            <Text style={[baseStyle.textGray, baseStyle.ft12]}>
              {item.createDate}
            </Text>
          </View>
        </View>
        <View style={baseStyle.paddingTop}>
          <Text>{item.describess}</Text>
          <View style={[baseStyle.row]}>
            {mainUrlList.map(imgPath => {
              return <Image style={[sty.itemImg]} source={{uri: imgPath}} />;
            })}
          </View>
        </View>
        <View style={sty.optionSty}>
          <View style={[baseStyle.relation, {marginRight: 20}]}>
            <Image
              source={require('../../images/zan_active_icon.png')}
              style={sty.iconImg}
            />
            <View style={sty.iconNum}>
              <Text>{item.upNum}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.props.openModal();
            }}>
            <View style={{marginRight: 10}}>
              <Image
                source={require('../../images/pl_icon.png')}
                style={sty.iconImg}
              />
              <View style={sty.iconNum}>
                <Text>{item.commentNum}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentId: '',
      commentBtn: '',
      currentUser: {},
      page: 1,
      list: [],
      total: 0,
    };
  }
  UNSAFE_componentWillMount() {
    global.localStorage.get({key: 'currentUser'}).then(res => {
      console.log(res);
      this.setState({
        currentUser: res,
      });
      this.getDynamicList();
    });
  }
  componentDidMount() {
    // this.addBtn();
  }
  addBtn() {
    TopviewGetInstance()
      .add(
        <TouchableOpacity
          onPress={() => {
            this.props.openRelease();
          }}
          style={{position: 'absolute', bottom: 60, right: 20}}>
          <Image
            source={require('../../images/add_icon.png')}
            style={sty.addIcon}
          />
        </TouchableOpacity>,
      )
      .then(id => {
        this.setState({
          commentBtn: id,
        });
      });
  }
  componentWillUnmount() {
    TopviewGetInstance().remove(this.state.commentBtn);
    TopviewGetInstance().remove(this.state.commentId);
  }
  openComment() {
    TopviewGetInstance()
      .add(
        <TouchableOpacity
          style={baseStyle.fullScreenMask}
          onPress={() => {
            this.textInput.blur();
          }}>
          <View style={sty.commentInputBox}>
            <TextInput
              ref={input => {
                this.textInput = input;
              }}
              style={sty.commentInputSty}
              placeholder="评论"
              onChange={value => {
                console.log(value);
              }}
              onBlur={() => {
                TopviewGetInstance().remove(this.state.commentId);
              }}
            />
          </View>
        </TouchableOpacity>,
      )
      .then(id => {
        this.setState({
          commentId: id,
        });
        this.textInput.focus();
      });
  }
  getDynamicList() {
    debugger;
    console.log('page', this.state.page);
    global
      .httpGetPromise('dynamic/list', {
        page: this.state.page,
        size: 10,
        userId: this.state.currentUser.userId,
      })
      .then(res => {
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
  refresh() {
    return global
      .httpGetPromise('dynamic/list', {
        page: this.state.page,
        size: 10,
        userId: this.state.currentUser.userId,
      })
      .then(res => {
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
    const {total, list} = this.state;
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
              <Item
                key={index}
                item={item}
                openModal={() => {
                  this.openComment();
                }}
              />
            );
          }}
          onEndReached={() => {
            const page = this.state.page + 1;
            this.setState({
              page: page,
            });
            console.log('onEndReached');
            // return this.getDynamicList();
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

const sty = StyleSheet.create({
  authorImg: {
    width: 40,
    height: 40,
  },
  itemBox: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  itemImg: {
    flex: 1,
    resizeMode: 'contain',
    margin: 5,
  },
  optionSty: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  iconImg: {
    width: 24,
    height: 24,
  },
  iconNum: {
    position: 'absolute',
    right: -10,
    top: -10,
  },
  addIcon: {
    width: 55,
    height: 55,
    resizeMode: 'contain',
  },

  commentInputBox: {
    position: 'absolute',
    bottom: 0,
    width: baseStyle.screenWidth,
    backgroundColor: '#fff',
    padding: 10,
  },
  commentInputSty: {
    borderColor: '#ccc',
    borderWidth: 0.5,
    borderRadius: 0.5,
    height: 40,
  },
});
