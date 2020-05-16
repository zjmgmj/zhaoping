import React, {Component} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {setStatusBar} from '../../components/setStatusBar';
import {baseStyle} from '../../components/baseStyle';
import {WebView} from 'react-native-webview';

@setStatusBar({
  barStyle: 'light-content',
  translucent: true,
  backgroundColor: 'transparent',
})
class ResumeVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shareModal: false,
      feedbacklist: [],
      detail: {
        currentUser: null,
      },
      company: null,
      headHeight: 0,
    };
  }
  UNSAFE_componentWillMount() {
    global.localStorage.get({key: 'currentUser'}).then(res => {
      this.setState({
        currentUser: res,
      });
    });
  }
  getSource() {
    const source = {
      uri:
        'http://192.168.0.101:5500/android/app/src/main/assets/src/page/video/video.html',
    };
    return source;
  }
  onMessage() {}
  render() {
    const source =
      Platform.OS == 'ios'
        ? require('./video.html')
        : {
            uri: 'file:///android_asset/src/page/video/video.html',
            // uri:
            //   'http://192.168.0.101:5500/android/app/src/main/assets/src/page/video/video.html',
          };
    return (
      <View style={{flex: 1}}>
        <WebView
          ref={ref => {
            this.webview = ref;
          }}
          javaScriptEnabled
          style={{width: baseStyle.screenWidth, height: 300}}
          source={source} //网络地址，放在本地会导致postmessage失效
          onMessage={this.onMessage.bind(this)}
          onLoad={() => {
            this.webview.postMessage(
              JSON.stringify({
                flog: 'open',
              }),
            );
          }}
        />
      </View>
    );
  }
}

export default ResumeVideo;

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
    resizeMode: 'cover',
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
  positionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 20,
  },
  positionTitleMin: {
    fontSize: 15,
    paddingTop: 15,
  },
  logoBox: {
    height: 50,
    width: 50,
    // borderRadius: 100,
    overflow: 'hidden',
  },
  logoImg: {
    height: 50,
    width: 50,
    // resizeMode: 'contain',
    resizeMode: 'cover',
  },
});
