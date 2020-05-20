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
import Modal, {ModalContent} from 'react-native-modals';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zan: require('../../images/zan_icon.png'),
      zanActive: require('../../images/zan_active_icon.png'),
      zanImg: null,
      modalShow: false,
    };
  }
  UNSAFE_componentWillMount() {
    this.setState({
      zanImg: this.props.item.isup ? this.state.zanActive : this.state.zan,
    });
  }
  giveupSave() {
    global.httpPost(
      'giveup/save',
      {
        relationId: this.props.item.id,
        type: 1,
        userId: this.props.currentUser.userId,
      },
      res => {
        console.log('giveupSave', res);
        this.props.onModal('点赞成功');
      },
      err => {
        console.log(err);
      },
    );
  }
  render() {
    const item = this.props.item;
    const mainUrlList = item.mainUrl ? item.mainUrl.split(',') : null;
    console.log('mainUrlList-----', mainUrlList);
    return (
      <View style={sty.itemBox}>
        <View style={baseStyle.row}>
          <View style={baseStyle.authorBox}>
            <Image source={{uri: item.userPic}} style={baseStyle.authorImg} />
          </View>
          <View style={baseStyle.paddingLeft}>
            <Text style={[baseStyle.textBlack, baseStyle.positionTitle]}>
              {item.userNickname || '暂无'}
            </Text>
            <Text style={[baseStyle.textGray, baseStyle.ft14]}>
              {global.date2Str(new Date(item.createDate))}
            </Text>
          </View>
        </View>
        {mainUrlList ? (
          <View style={baseStyle.paddingTop}>
            <Text style={{color: '#333333'}}>{item.describess}</Text>
            <View style={[baseStyle.row]}>
              {mainUrlList.map((imgPath, idx) => {
                return (
                  <Image
                    key={idx}
                    style={[sty.itemImg]}
                    source={{uri: imgPath}}
                  />
                );
              })}
            </View>
          </View>
        ) : null}

        <View style={sty.optionSty}>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                zanImg: this.state.zanActive,
              });
              this.giveupSave();
            }}
            style={[baseStyle.relation, {marginRight: 20}]}>
            <Image source={this.state.zanImg} style={sty.iconImg} />
            <View style={sty.iconNum}>
              <Text>{item.upNum}</Text>
            </View>
          </TouchableOpacity>
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
      commentContent: '',
      modalShow: false,
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
  ModalToggleBox() {
    return (
      <Modal
        visible={this.state.modalShow}
        onTouchOutside={() => {
          this.setState({
            modalShow: false,
          });
        }}>
        <ModalContent>
          <Text>{this.state.modalContent}</Text>
        </ModalContent>
      </Modal>
    );
  }
  addBtn() {
    const navigation = this.props.navigation;
    TopviewGetInstance()
      .add(
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ReleaseDynamic', {
              callBack: () => {
                this.setState({
                  page: 1,
                });
                this.getDynamicList();
              },
            });
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
  getDerivedStateFromProps() {
    TopviewGetInstance().remove(this.state.commentBtn);
    TopviewGetInstance().remove(this.state.commentId);
  }
  openComment(item) {
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
              onChange={e => {
                this.setState({
                  commentContent: e.nativeEvent.text,
                });
              }}
              onSubmitEditing={() => {
                this.commentSave(item);
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
        console.log('resData', res);
        console.log('resData.result', resData.result);
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
  commentSave(item) {
    const currentUser = this.state.currentUser;
    const params = {
      content: this.state.commentContent,
      dynamicId: item.id,
      userId: currentUser.userId,
      type: 1,
      modalContent: '',
    };
    global.httpPost(
      'comment/save',
      params,
      res => {
        console.log(res);
        this.getDynamicList();
      },
      err => {
        console.log(err);
      },
    );
  }
  render() {
    const {total, list} = this.state;
    return (
      <View style={{flex: 1}}>
        <Longlist
          ref={longList => {
            this.longList = longList;
          }}
          style={{flex: 1}}
          total={total}
          data={list}
          renderItem={({item, index}) => {
            return (
              <View
                key={index}
                style={
                  index > 0
                    ? {borderTopColor: '#FBFBFB', borderTopWidth: 5}
                    : null
                }>
                <Item
                  item={item}
                  currentUser={this.state.currentUser}
                  openModal={() => {
                    this.openComment(item);
                  }}
                  onModal={message => {
                    this.setState({
                      modalShow: true,
                      modalContent: message,
                    });
                  }}
                />
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
        {this.ModalToggleBox()}
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('ReleaseDynamic', {
              callBack: () => {
                this.setState({
                  page: 1,
                });
                this.getDynamicList();
              },
            });
          }}
          style={{position: 'absolute', bottom: 10, right: 20}}>
          <Image
            source={require('../../images/add_icon.png')}
            style={sty.addIcon}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const sty = StyleSheet.create({
  describess: {
    color: '#333',
    paddingTop: 5,
    paddingBottom: 5,
  },
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
    width: (baseStyle.screenWidth - 40) / 3,
    height: 75,
    resizeMode: 'cover',
    margin: 5,
  },
  optionSty: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  iconImg: {
    width: 24,
    height: 24,
    resizeMode: 'cover',
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
