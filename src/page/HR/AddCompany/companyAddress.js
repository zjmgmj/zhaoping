import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Header from '../../../components/Header';
import {setStatusBar} from '../../../components/setStatusBar';
import {baseStyle} from '../../../components/baseStyle';
import {WebView} from 'react-native-webview';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class CompanyAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '84da93e3e2fc135820d11287e5a57dd8',
      center: '',
      keywords: '',
    };
  }
  UNSAFE_componentWillMount() {}
  getSource() {
    const source =
      Platform.OS == 'ios'
        ? require('./map.html')
        : {
            uri: 'file:///android_asset/src/page/map/map.html',
            // uri:
            //   'http://192.168.0.101:5500/android/app/src/main/assets/src/page/map/map.html',
          };
    return source;
  }
  onMessage(nativeEvent) {
    const {data} = nativeEvent.nativeEvent;
    const key = 'ebd60e0204faedb11b2ba4214d9d0620';
    const location = data.location;
    console.log('data', data);
    global.httpGet(
      `https://restapi.amap.com/v3/geocode/regeo?location=${location}&key=${key}`,
      {},
      res => {
        console.log('onMessage', res);
      },
    );
    // this.props.navigation.state.params.callBack({data});
    // this.props.navigation.goBack();
  }
  render() {
    return (
      <View style={[baseStyle.bgWhite, {flex: 1}]}>
        <Header isHeader={false} />
        <WebView
          ref={ref => {
            this.wb = ref;
          }}
          javaScriptEnabled
          scalesPageToFit
          source={this.getSource()} //网络地址，放在本地会导致postmessage失效
          onMessage={nativeEvent => {
            const {data} = nativeEvent.nativeEvent;
            console.log(data);
          }}
        />
      </View>
    );
  }
}

export default CompanyAddress;
const sty = StyleSheet.create({
  inputContent: {
    lineHeight: 20,
    fontSize: 16,
    position: 'absolute',
    zIndex: 2,
    width: baseStyle.screenWidth - 20,
  },
});
