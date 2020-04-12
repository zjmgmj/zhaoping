import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {setStatusBar} from '../../components/setStatusBar';
import Header from '../../components/Header';
import {baseStyle} from '../../components/baseStyle';
import Iconright from '../../iconfont/Iconright';

class ItemComp extends Component {
  render() {
    return (
      <View
        style={[
          baseStyle.flex,
          baseStyle.justifyBetween,
          {paddingBottom: 10, paddingTop: 10, alignItems: 'flex-end'},
        ]}>
        <View style={baseStyle.row}>
          <Image
            style={sty.author}
            source={require('../../images/author.png')}
          />
          <View style={baseStyle.paddingLeft}>
            <Text style={{marginBottom: 5}}>李梅亭</Text>
            <Text>市场经理 | 互联网价值观</Text>
          </View>
        </View>
        <Iconright color="#D3CECE" />
      </View>
    );
  }
}

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class Followig extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const list = [1, 2, 3, 4, 5, 6];
    return (
      <View style={[{flex: 1, backgroundColor: '#fff'}]}>
        <Header
          title="关注的人"
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
          fullScreen
        />
        <ScrollView style={baseStyle.content}>
          {list.map(item => {
            return (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('PersonalInfo');
                }}
                style={baseStyle.borderBottom}
                key={item}>
                <ItemComp />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

export default Followig;

const sty = StyleSheet.create({
  author: {
    width: 47,
    height: 47,
  },
});
