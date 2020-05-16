import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  PixelRatio,
  TextInput,
} from 'react-native';
import Header from '../../components/Header';
import {setStatusBar} from '../../components/setStatusBar';
import {baseStyle} from '../../components/baseStyle';
import {selectPhotoTapped} from '../../components/SelectPhotoTapped';
@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class ReleaseDynamic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgSource: [],
      videoSource: null,
      currentUser: {},
      content: '',
      picUrlList: [],
    };
  }
  UNSAFE_componentWillMount() {
    global.localStorage.get({key: 'currentUser'}).then(res => {
      this.setState({
        currentUser: res,
      });
    });
  }

  release() {
    const currentUser = this.state.currentUser;
    const params = {
      userId: currentUser.userId,
      userNickname: currentUser.userNickname,
      userPic: currentUser.userPic,
      type: 1,
      mainUrl: this.state.picUrlList.toString(),
      describess: this.state.content,
    };
    console.log('params', params);
    global.httpPost(
      'dynamic/save',
      params,
      res => {
        if (res.code === 1) {
          this.props.navigation.state.params.callBack();
          this.props.navigation.goBack();
        }
      },
      err => {
        console.log(err);
      },
    );
  }

  render() {
    return (
      <View style={baseStyle.bgWhite}>
        <Header
          title="发布动态"
          right="发布"
          rightStyle={baseStyle.textYellow}
          fullScreen
          onRightPress={() => {
            this.release();
          }}
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <View style={sty.textInputBoxSty}>
          <Image
            source={require('../../images/author.png')}
            style={sty.authorImg}
          />
          <View style={sty.textInputSty}>
            <TextInput
              style={baseStyle.paddingLeft}
              placeholder="请输入内容"
              multiline
              onChange={e => {
                this.setState({
                  content: e.nativeEvent.text,
                });
              }}
            />
          </View>
        </View>
        <View style={[baseStyle.row, {paddingBottom: 20, flexWrap: 'wrap'}]}>
          {this.state.picUrlList.map((item, idx) => {
            return (
              <View key={idx} style={baseStyle.paddingLeft}>
                <Image style={[sty.itemImg]} source={{uri: item}} />
              </View>
            );
          })}
          <TouchableOpacity
            onPress={() => {
              selectPhotoTapped({
                me: this,
                cb: res => {
                  const picUrlList = this.state.picUrlList;
                  picUrlList.push(res);
                  this.setState({
                    picUrlList: picUrlList,
                  });
                },
              });
            }}>
            <View style={baseStyle.paddingLeft}>
              <Image
                style={[sty.itemImg]}
                source={require('../../images/photo_add.png')}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ReleaseDynamic;
const sty = StyleSheet.create({
  authorImg: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
  textInputBoxSty: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 10,
  },
  textInputSty: {
    width: baseStyle.screenWidth - 50,
    minHeight: 200,
  },
  itemImg: {
    width: 101.5,
    height: 75.5,
    // width: pixelRatio(101.5),
    // height: pixelRatio(75.5),
  },
});
