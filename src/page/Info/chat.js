import React, {Component} from 'react';
import {Platform, View, Text, Alert} from 'react-native';
import {WebView} from 'react-native-webview';
import {setStatusBar} from '../../components/setStatusBar';
import {baseStyle} from '../../components/baseStyle';
import Header from '../../components/Header';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import Sound from 'react-native-sound';
import TIM from '../../utils/sdk/tim-js.js';
import {genTestUserSig} from '../../utils/GenerateTestUserSig.js';

const options = {
  SDKAppID: 1400362440,
};
const tim = TIM.create(options);

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class Chat extends Component {
  constructor() {
    super();
    this.state = {
      html: 'file:///android_asset/src/page/info/chat.html',
      currentUser: null,
      hasPermission: undefined, //授权状态
      audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac', // 文件路径
      recording: false, //是否录音
      pause: false, //录音是否暂停
      stop: false, //录音是否停止
      currentTime: 0, //录音时长
      toUserId: '18260052952',
      isReady: false,
    };
  }
  UNSAFE_componentWillMount() {
    global.localStorage.get({key: 'currentUser'}).then(res => {
      console.log('currentUser', res);
      this.setState({
        currentUser: res,
        log: 'log',
      });
      this.tinOn();
      this.login();
      tim.on(TIM.EVENT.SDK_READY, event => {
        this.setState({
          isReady: true,
        });
      });
    });
  }
  componentDidMount() {
    // 请求授权
    AudioRecorder.requestAuthorization().then(isAuthor => {
      console.log('是否授权: ' + isAuthor);
      if (!isAuthor) {
        return alert('请前往设置开启录音权限');
      }
      this.setState({hasPermission: isAuthor});
      this.prepareRecordingPath(this.state.audioPath);
      // 录音进展
      AudioRecorder.onProgress = data => {
        this.setState({currentTime: Math.floor(data.currentTime)});
      };
      // 完成录音
      AudioRecorder.onFinished = data => {
        // data 返回需要上传到后台的录音数据
        console.log(this.state.currentTime);
        console.log(data);
      };
    });
  }

  /**
   * AudioRecorder.prepareRecordingAtPath(path,option)
   * 录制路径
   * path 路径
   * option 参数
   */
  prepareRecordingPath = path => {
    const option = {
      SampleRate: 44100.0, //采样率
      Channels: 2, //通道
      AudioQuality: 'High', //音质
      AudioEncoding: 'aac', //音频编码
      OutputFormat: 'mpeg_4', //输出格式
      MeteringEnabled: false, //是否计量
      MeasurementMode: false, //测量模式
      AudioEncodingBitRate: 32000, //音频编码比特率
      IncludeBase64: true, //是否是base64格式
      AudioSource: 0, //音频源
    };
    AudioRecorder.prepareRecordingAtPath(path, option);
  };

  // 开始录音
  _record = async () => {
    console.log('_record');
    if (!this.state.hasPermission) {
      return Alert.alert('', '没有授权');
      // return false;
    }
    if (this.state.recording) {
      return Alert.alert('', '正在录音中...');
      // return false;
    }
    if (this.state.stop) {
      this.prepareRecordingPath(this.state.audioPath);
    }
    try {
      await AudioRecorder.startRecording();
      console.log('currentTime', this.state.currentTime);
      this.setState({recording: true, pause: false});
      const recordTimeOut = setInterval(() => {
        const currentTime = this.state.currentTime;
        if (currentTime === 60) {
          clearTimeout(recordTimeOut);
          this._stop();
        }
        this.setState({
          currentTime: currentTime + 1,
          log: currentTime,
        });
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  // 暂停录音
  _pause = async () => {
    if (!this.state.recording) {
      return alert('当前未录音');
    }

    try {
      await AudioRecorder.pauseRecording();
      this.setState({pause: true, recording: false});
    } catch (err) {
      console.log(err);
    }
  };

  // 恢复录音
  _resume = async () => {
    if (!this.state.pause) {
      return alert('录音未暂停');
    }

    try {
      await AudioRecorder.resumeRecording();
      this.setState({pause: false, recording: true});
    } catch (err) {
      console.log(err);
    }
  };

  // 停止录音
  _stop = async () => {
    this.setState({stop: true, recording: false, paused: false});
    try {
      await AudioRecorder.stopRecording();
      this.createAudioMessage();
    } catch (error) {
      console.error(error);
    }
  };

  // 播放录音
  _play = async () => {
    let whoosh = new Sound(this.state.audioPath, '', err => {
      if (err) {
        return console.log(err);
      }
      whoosh.play(success => {
        if (success) {
          console.log('success - 播放成功');
        } else {
          console.log('fail - 播放失败');
        }
      });
    });
  };
  tinOn() {
    let onMessageReceived = function(event) {
      console.log('MESSAGE_RECEIVED');
      // 收到推送的单聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
      // event.name - TIM.EVENT.MESSAGE_RECEIVED
      // event.data - 存储 Message 对象的数组 - [Message]
    };
    tim.on(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived);
  }
  login() {
    const userId = this.state.userId;
    // const userSig = this.state.currentUser.userSig;
    const userSig = genTestUserSig(userId);
    let promise = tim.login({userID: userId, userSig: userSig});
    promise
      .then(imResponse => {
        console.log(imResponse.data); // 登录成功
        if (imResponse.data.repeatLogin === true) {
          // 标识账号已登录，本次登录操作为重复登录。v2.5.1 起支持
          console.log(imResponse.data.errorInfo);
        }
      })
      .catch(function(imError) {
        console.warn('login error:', imError); // 登录失败的相关信息
      });
  }
  createAudioMessage() {
    if (!this.state.isReady) {
      return false;
    }
    const message = tim.createAudioMessage({
      to: this.state.toUserId,
      conversationType: TIM.TYPES.CONV_C2C,
      // 消息优先级，用于群聊（v2.4.2起支持）。如果某个群的消息超过了频率限制，后台会优先下发高优先级的消息，详细请参考：https://cloud.tencent.com/document/product/269/3663#.E6.B6.88.E6.81.AF.E4.BC.98.E5.85.88.E7.BA.A7.E4.B8.8E.E9.A2.91.E7.8E.87.E6.8E.A7.E5.88.B6)
      // 支持的枚举值：TIM.TYPES.MSG_PRIORITY_HIGH, TIM.TYPES.MSG_PRIORITY_NORMAL（默认）, TIM.TYPES.MSG_PRIORITY_LOW, TIM.TYPES.MSG_PRIORITY_LOWEST
      // priority: TIM.TYPES.MSG_PRIORITY_NORMAL,
      payload: {
        file: `file://${this.state.audioPath}`,
      },
    });
    this.sendMsg(message);
  }
  sendMsg(message) {
    debugger;
    let promise = tim.sendMessage(message);
    promise
      .then(imResponse => {
        // 发送成功
        console.log(imResponse);
        this.webview.postMessage('sendSuccess');
      })
      .catch(imError => {
        // 发送失败
        console.warn('sendMessage error:', imError);
      });
  }
  onMessage(event) {
    this.setState({
      log: event.nativeEvent.data,
    });
    const res = JSON.parse(event.nativeEvent.data);
    debugger;
    if (res.type === 'record') {
      this._record();
    } else if (res.type === 'recordStop') {
      this._stop();
    }
  }
  render() {
    const {currentUser, log} = this.state;
    if (!currentUser) {
      return false;
    }
    const source =
      Platform.OS == 'ios'
        ? require('./chat.html')
        : {
            baseUrl: 'file:///android_asset/src',
            uri: 'file:///android_asset/src/page/info/chat.html',
          };

    return (
      <View style={[{flex: 1, backgroundColor: '#fff'}]}>
        <Header
          titleElement={
            <View>
              <Text style={{textAlign: 'center'}}>李小姐</Text>
              <Text style={[baseStyle.textYellow, {textAlign: 'center'}]}>
                人力资源经理
              </Text>
            </View>
          }
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
          fullScreen
        />
        <View>
          <Text>{log}</Text>
        </View>
        <WebView
          injectedJavaScript={'awaitPostMessage()'}
          ref={w => (this.webview = w)}
          javaScriptEnabled={true}
          onMessage={this.onMessage.bind(this)}
          source={source}
          renderError={() => {
            console.log('renderError');
            return (
              <View>
                <Text>renderError回调了，出现错误</Text>
              </View>
            );
          }}
          onLoad={() => {
            const userId = currentUser.userId.toString();
            this.webview.postMessage(userId);
          }}
        />
      </View>
    );
  }
}
export default Chat;
