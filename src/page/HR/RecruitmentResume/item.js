import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {baseStyle} from '../../../components/baseStyle';

class Item extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const navigation = this.props.navigation;
    const item = this.props.item;
    return (
      <View style={baseStyle.content}>
        <View
          style={[
            baseStyle.row,
            baseStyle.justifyBetween,
            baseStyle.paddingBottom,
          ]}>
          <Text>{item.positionName}</Text>
          <Text style={[baseStyle.textGray, baseStyle.ft12]}>03-05</Text>
        </View>
        <Text style={baseStyle.textRed}>18-20K</Text>
        <Text style={{color: '#333333', marginTop: 10}}>
          {item.companyName}
        </Text>
        <View
          style={[baseStyle.row, {justifyContent: 'flex-end', marginTop: 10}]}>
          <TouchableOpacity
            onPress={() => {
              global.uploadFile(res => {
                console.log('res', res);
                this.props.updatePositionRecord(res.data);
              });
            }}
            style={sty.buttonSty}>
            <Text style={baseStyle.textYellow}>上传简历模板</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ResumeList', {
                positionId: item.id,
              });
            }}
            style={sty.buttonSty}>
            <Text style={baseStyle.textYellow}>该职位收到的简历</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Item;
const sty = StyleSheet.create({
  buttonSty: {
    borderColor: '#D9B06F',
    borderWidth: 0.5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 10,
  },
});
