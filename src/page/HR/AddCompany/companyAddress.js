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
      municipality: ['上海市', '北京市', '天津市', '重庆市'],
    };
  }
  UNSAFE_componentWillMount() {}
  getSource() {
    const source =
      Platform.OS == 'ios'
        ? require('./map.html')
        : {
            uri: 'http://114.55.169.95/yun_rest/map.html',
            // uri: 'http://192.168.0.101:5500/src/page/HR/AddCompany/map.html',
          };
    return source;
  }
  httpGetArea(url) {
    let opt = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    console.log('httpGet', url);
    //发起请求
    fetch(url, opt)
      .then(data => {
        return data.json();
      })
      .then(response => {
        if (response) {
          console.log('response', response);
          this.props.navigation.state.params.callBack({response});
          this.props.navigation.goBack();
        }
      })
      .catch(error => {
        if (error) {
          console(error);
        }
      });
  }
  onMessage(nativeEvent) {
    const {data} = nativeEvent.nativeEvent;
    const key = 'ebd60e0204faedb11b2ba4214d9d0620';
    const dataObj = JSON.parse(data);
    if (dataObj.type) {
      this.props.navigation.goBack();
    }
    const location = dataObj.location;
    const that = this;
    const municipality = this.state.municipality;
    const url = `https://restapi.amap.com/v3/geocode/regeo?location=${location}&key=${key}`;
    global.httpGetLocation(url, res => {
      console.log(res);
      console.log('response', res);
      const resData = res.regeocode;
      const {addressComponent} = resData;
      const areaData = {
        provinceName: addressComponent.province,
        cityName: addressComponent.city,
        regionName: addressComponent.district,
        district: addressComponent.district,
        address: dataObj.address,
        location: location,
      };
      if (municipality.indexOf(addressComponent.province) > -1) {
        areaData.cityName = addressComponent.province;
      }
      console.log('areaData', JSON.stringify(areaData));
      this.props.navigation.state.params.callBack(areaData);
      this.props.navigation.goBack();
    });
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
          onMessage={this.onMessage.bind(this)}
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
