import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {baseStyle} from '../../../components/baseStyle';
import Iconright from '../../../iconfont/Iconright';

class ItemComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
    };
  }

  render() {
    const item = this.props.item;
    return (
      <View>
        <View
          style={[
            baseStyle.flex,
            baseStyle.justifyBetween,
            {paddingBottom: 5, paddingTop: 10, alignItems: 'flex-end'},
          ]}>
          <View style={baseStyle.row}>
            <Image style={sty.author} source={{uri: item.pic}} />
            <View style={baseStyle.paddingLeft}>
              <Text style={{marginBottom: 5}}>{item.name}</Text>
              <Text>{item.resumeIntention}</Text>
              {/* <Text>市场经理 | 互联网价值观</Text> */}
            </View>
          </View>
          <Iconright color="#D3CECE" />
        </View>
        <View
          style={[baseStyle.row, {justifyContent: 'flex-end', marginTop: 10}]}>
          <TouchableOpacity
            onPress={() => {
              console.log('----');
              this.props.refuse();
            }}
            style={sty.buttonSty}>
            <Text style={baseStyle.textYellow}>拒绝面试</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.updatePositionRecord(item.userId);
            }}
            style={sty.buttonSty}>
            <Text style={baseStyle.textYellow}>邀请面试</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ItemComp;
const sty = StyleSheet.create({
  author: {
    width: 47,
    height: 47,
  },
  buttonSty: {
    borderColor: '#D9B06F',
    borderWidth: 0.5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 10,
    marginBottom: 10,
  },
});
