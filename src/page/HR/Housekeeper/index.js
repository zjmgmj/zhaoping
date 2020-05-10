import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
  // SafeAreaView,
} from 'react-native';
import {Button} from 'beeshell/dist/components/Button';
import Header from '../../../components/Header';
import {setStatusBar} from '../../../components/setStatusBar';
import {baseStyle} from '../../../components/baseStyle';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class Housekeeper extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  UNSAFE_componentWillMount() {}

  render() {
    const list = [1, 2, 3, 4, 5];
    return (
      <View style={[baseStyle.bgWhite, {flex: 1}]}>
        <Header
          title="专属管家"
          fullScreen
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <ScrollView style={baseStyle.content}>
          <View style={[baseStyle.row, baseStyle.justifyBetween]}>
            <Text style={baseStyle.ft16}>平台推荐管家</Text>
            <Text style={[baseStyle.ft15, baseStyle.textYellow]}>换一批</Text>
          </View>
          <View style={[baseStyle.row, {flexWrap: 'wrap', paddingTop: 10}]}>
            {list.map(item => {
              return (
                <View
                  key={item}
                  style={[
                    baseStyle.paddingLeft,
                    baseStyle.paddingRight,
                    baseStyle.paddingTop,
                    {width: (baseStyle.screenWidth - 30) / 4},
                  ]}>
                  <View style={[sty.row, {alignItems: 'center'}]}>
                    <View style={sty.authorImgBox}>
                      <Image
                        source={require('../../../images/author.png')}
                        style={sty.authorImg}
                      />
                    </View>
                  </View>
                  <Text
                    style={{
                      textAlign: 'center',
                      marginTop: 5,
                      marginBottom: 5,
                    }}>
                    专业顾问
                  </Text>
                  <Text style={{textAlign: 'center'}}>李经理</Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}
const itemWidth = (baseStyle.screenWidth - 80) / 4;
export default Housekeeper;
const sty = StyleSheet.create({
  playBox: {
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 187.5,
  },
  personText: {
    lineHeight: 25,
    marginTop: 10,
    padding: 10,
  },
  subBtn: {
    backgroundColor: '#D9B06F',
    marginTop: 50,
  },
  authorImgBox: {
    width: 60,
    height: 60,
    borderRadius: 100,
    overflow: 'hidden',
  },
  authorImg: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
});
