import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {baseStyle} from '../../components/baseStyle';

class Item extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const item = this.props.item.item;
    console.log('item', item.positionName);
    return (
      <View style={baseStyle.content}>
        <View
          style={[
            baseStyle.row,
            baseStyle.justifyBetween,
            baseStyle.paddingBottom,
          ]}>
          <Text>{item.positionName}</Text>
          <Text style={[baseStyle.textGray, baseStyle.ft12]}>
            {global.date2Str(new Date(item.entryDate))}
          </Text>
        </View>
        <Text style={baseStyle.textRed}>{item.experienceName}</Text>
        <View
          style={[
            baseStyle.row,
            baseStyle.justifyBetween,
            baseStyle.paddingTop,
          ]}>
          <Text style={{color: '#333333'}}>{item.companyName}</Text>
          <Text style={[baseStyle.textYellow]}>已联系</Text>
        </View>
      </View>
    );
  }
}

export default Item;
