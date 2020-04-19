import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {baseStyle} from '../../components/baseStyle';

class Item extends Component {
  render() {
    return (
      <View style={baseStyle.content}>
        <View
          style={[
            baseStyle.row,
            baseStyle.justifyBetween,
            baseStyle.paddingBottom,
          ]}>
          <Text>人力资源主管</Text>
          <Text style={[baseStyle.textGray, baseStyle.ft12]}>03-05</Text>
        </View>
        <Text style={baseStyle.textRed}>18-20K</Text>
        <View
          style={[
            baseStyle.row,
            baseStyle.justifyBetween,
            baseStyle.paddingTop,
          ]}>
          <Text style={{color: '#333333'}}>上海汇之余服饰有限公司</Text>
          <Text style={[baseStyle.textYellow]}>已联系</Text>
        </View>
      </View>
    );
  }
}

export default Item;
