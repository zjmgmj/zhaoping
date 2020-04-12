import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {setStatusBar} from '../../components/setStatusBar';
import Header from '../../components/Header';
import {baseStyle} from '../../components/baseStyle';

class Item extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.jumpChat();
        }}
        style={[baseStyle.row, sty.itemBox]}>
        <Image
          source={require('../../images/author.png')}
          style={sty.authorImg}
        />
        <View style={{flex: 1, paddingLeft: 10}}>
          <Text style={baseStyle.ft16}>求职攻略</Text>
          <Text style={[baseStyle.textGray, {marginTop: 5, color: '#303135'}]}>
            工作专业不对口，跨专业求职该做哪些 准备？
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class Community extends Component {
  render() {
    const list = [1, 2, 3, 4];
    return (
      <View style={[{flex: 1, backgroundColor: '#fff'}]}>
        <Header
          title="我的社群"
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
          fullScreen
        />
        <ScrollView>
          <View style={{padding: 10}}>
            {list.map(item => {
              return (
                <Item
                  key={item}
                  jumpChat={() => {
                    this.props.navigation.navigate('InfoChat');
                  }}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Community;

const sty = StyleSheet.create({
  authorImg: {
    width: 40,
    height: 40,
  },
  itemBox: {
    padding: 10,
    borderBottomColor: '#E8E7E7',
    borderBottomWidth: 0.5,
  },
  itemTime: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    height: 60,
  },
});
