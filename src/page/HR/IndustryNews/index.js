import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  // SafeAreaView,
} from 'react-native';
import {Button} from 'beeshell/dist/components/Button';
import Header from '../../../components/Header';
import {setStatusBar} from '../../../components/setStatusBar';
import {baseStyle} from '../../../components/baseStyle';
import {Iconright} from '../../../iconfont/Iconright';
import Picker from '../../../components/picker';
import {TopviewGetInstance} from 'beeshell';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class IndustryNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsList: [1, 2, 3],
    };
  }
  UNSAFE_componentWillMount() {}
  render() {
    const list = this.state.newsList;
    return (
      <View style={[baseStyle.bgWhite, {flex: 1}]}>
        <Header
          title="行业资讯"
          fullScreen
          // right="发布资讯"
          // onRightPress={() => {
          //   this.props.navigation.navigate('IndustryRelease', {
          //     callBack: () => {
          //       console.log('callBack');
          //     },
          //   });
          // }}
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <ScrollView style={baseStyle.content}>
          {list.map(item => {
            return (
              <View key={item} style={[sty.newItem, baseStyle.borderBottom]}>
                <Image
                  source={require('../../../images/home_1.png')}
                  style={sty.hotImg}
                />
                <View style={{paddingLeft: 10, flex: 1}}>
                  <Text style={(baseStyle.ft14, baseStyle.fontBold)}>
                    2020年就业趋势调研报告
                  </Text>
                  <Text style={sty.newDetail}>
                    突如其来的新冠肺炎疫情打乱了人们的生活，漫长的“宅家”和延迟复工让职场人的职业规划发生了变化
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

export default IndustryNews;
const sty = StyleSheet.create({
  hotImg: {
    width: 78,
    height: 58,
    resizeMode: 'contain',
  },
  newItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 20,
  },
  newDetail: {
    color: '#000',
    fontSize: 12,
    paddingTop: 5,
  },
});
