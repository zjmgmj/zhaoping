import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
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
        <Text style={{flex: 1, paddingLeft: 10}}>
          稍后我会仔细看一下简历，稍后给你回复信息。
        </Text>
        <View style={baseStyle.itemTime}>
          <Text style={[baseStyle.textGray, baseStyle.ft12]}>今天12:34</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default class News extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const list = [1, 2, 3, 4];
    return (
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
    );
  }
}

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
