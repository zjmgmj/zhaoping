import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/Header';
import {setStatusBar} from '../../components/setStatusBar';
import {baseStyle} from '../../components/baseStyle';
import {Iconright} from '../../iconfont/Iconright';
import {WebView} from 'react-native-webview';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class companyInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyId: '',
      company: null,
      positionList: [],
    };
  }
  UNSAFE_componentWillMount() {
    const companyId = this.props.navigation.getParam('id');
    this.setState({
      companyId: companyId,
    });
    this.getCompany(companyId);
    global.localStorage.get({key: 'currentUser'}).then(res => {
      this.setState({
        currentUser: res,
      });
      this.getPosition(res.userId, companyId);
    });
  }
  getCompany(companyId) {
    global.httpGet(
      'company/detail',
      {id: companyId},
      res => {
        console.log(res);
        this.setState({
          company: res.data,
        });
      },
      err => {
        console.log(err);
      },
    );
  }
  getSource() {
    const source = {
      uri: 'http://114.55.169.95/yun_rest/mapInfo.html',
    };
    return source;
  }
  getPosition(userId, companyId) {
    const params = {
      page: 1,
      size: 20,
      // userId: userId,
      // positionType: 1,
      companyId: companyId,
      // page=1&size=10&userId=7&positionType=1
    };
    global.httpGet('position/list', params, res => {
      console.log('positionList', res);
      this.setState({
        positionList: res.data.result,
        total: res.total,
      });
    });
  }
  render() {
    const {company, positionList} = this.state;
    if (!company) {
      return false;
    }
    return (
      <View style={[baseStyle.bgWhite, {flex: 1}]}>
        <Header
          title="公司信息"
          fullScreen
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <ScrollView style={baseStyle.content}>
          <View>
            {company ? (
              <View style={[baseStyle.bgWhite]}>
                <View style={[baseStyle.justifyBetween, baseStyle.row]}>
                  <View style={[baseStyle.row]}>
                    <View style={[baseStyle.logoBox, {borderWidth: 0}]}>
                      {company.logo ? (
                        <Image
                          style={baseStyle.logoImg}
                          source={{uri: company.logo || null}}
                        />
                      ) : null}
                    </View>
                    <View style={baseStyle.paddingLeft}>
                      <Text style={baseStyle.companyName}>{company.name}</Text>
                      <View
                        style={[
                          baseStyle.row,
                          baseStyle.ft12,
                          baseStyle.textGray,
                          {marginTop: 10},
                        ]}>
                        <Text style={baseStyle.marginRight}>
                          {company.companySizeName}
                        </Text>
                        <Text style={baseStyle.marginRight}>
                          {company.unitQualificationName}
                        </Text>
                        <Text style={baseStyle.marginRight}>
                          {company.cityName}
                          {company.regionName}
                        </Text>
                      </View>
                    </View>
                  </View>
                  {/* <Iconright color="#D3CECE" /> */}
                </View>
                <View
                  style={{
                    marginTop: 15,
                    paddingTop: 15,
                    borderTopColor: '#FBFBFB',
                    borderTopWidth: 5,
                  }}>
                  <Text style={[baseStyle.companyName]}>公司介绍</Text>
                  <Text style={sty.content}>{company.introduction}</Text>
                </View>
                <Text style={[baseStyle.companyName, {paddingTop: 10}]}>
                  公司地址
                </Text>
                <WebView
                  ref={ref => {
                    this.webview = ref;
                  }}
                  javaScriptEnabled
                  scalesPageToFit
                  style={{height: 129, marginTop: 15}}
                  source={this.getSource()}
                  onLoad={() => {
                    this.webview.postMessage(
                      JSON.stringify({
                        dest: `${company.longitude},${company.latitude}`,
                        destName: company.address,
                      }),
                    );
                  }}
                />
                <View style={{paddingTop: 15}}>
                  <Text style={baseStyle.companyName}>公司官网</Text>
                  <Text style={[baseStyle.textYellow]}>{company.urls}</Text>
                </View>
                <View style={{paddingTop: 15, paddingBottom: 25}}>
                  <View
                    style={[baseStyle.borderBottom, baseStyle.paddingBottom]}>
                    <Text style={baseStyle.companyName}>招聘职位</Text>
                  </View>
                  {positionList
                    ? positionList.map((item, idx) => {
                        return (
                          <TouchableOpacity
                            key={idx}
                            onPress={() => {
                              this.props.navigation.navigate('PositionDetail', {
                                id: item.id,
                                companyId: item.companyId,
                              });
                            }}
                            style={[
                              idx > 0 ? sty.borderTop : null,
                              sty.positionItem,
                              baseStyle.flex,
                              baseStyle.justifyBetween,
                            ]}>
                            <View style={[baseStyle.row, {flex: 1}]}>
                              <View style={baseStyle.logoBox}>
                                {item.logo ? (
                                  <Image
                                    style={baseStyle.logoImg}
                                    source={{uri: item.logo || null}}
                                  />
                                ) : null}
                              </View>
                              <View style={{paddingLeft: 15}}>
                                <Text style={[baseStyle.positionTitle]}>
                                  {item.positionName}
                                </Text>
                                <Text
                                  style={[baseStyle.ft13, baseStyle.textGray]}>
                                  {item.companyName}
                                </Text>
                                <View
                                  style={[
                                    baseStyle.row,
                                    baseStyle.justifyBetween,
                                    {
                                      marginTop: 3,
                                      width: baseStyle.screenWidth - 85,
                                    },
                                  ]}>
                                  <View style={[baseStyle.row]}>
                                    {item.cityName ? (
                                      <View style={sty.positionTag}>
                                        <Text style={sty.textGray}>
                                          {item.cityName}
                                        </Text>
                                      </View>
                                    ) : null}
                                    {item.experienceName ? (
                                      <View style={sty.positionTag}>
                                        <Text style={sty.textGray}>
                                          {item.experienceName}
                                        </Text>
                                      </View>
                                    ) : null}
                                    {item.educationName ? (
                                      <View style={sty.positionTag}>
                                        <Text style={sty.textGray}>
                                          {item.educationName}
                                        </Text>
                                      </View>
                                    ) : null}
                                  </View>
                                  {/* <Text style={[baseStyle.textGray, baseStyle.ft12]}>
                              HR 7天未查看
                            </Text> */}
                                </View>
                              </View>
                            </View>
                            <View>
                              <Text
                                style={[
                                  {color: '#AC3E40'},
                                  baseStyle.fontBold,
                                ]}>
                                {item.salaryName}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        );
                      })
                    : null}
                </View>
              </View>
            ) : null}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default companyInfo;
const sty = StyleSheet.create({
  logoImg: {
    height: 50,
    width: 50,
    resizeMode: 'cover',
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
  content: {
    paddingTop: 10,
    fontSize: 15,
    lineHeight: 28,
  },
  positionItem: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  positionImg: {
    width: 53,
    height: 64,
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
  borderTop: {
    borderTopColor: '#FBFBFB',
    borderTopWidth: 5,
  },
});
