import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {baseStyle} from '../../components/baseStyle';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusObj: {
        0: '已投递',
        2: '已面试',
        3: '未面试',
        4: '拒绝面试',
        6: '已雇佣',
      },
    };
  }
  render() {
    const item = this.props.item.item;
    const statusObj = this.state.statusObj;
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
        <Text style={baseStyle.textRed}>{item.salaryName}</Text>
        <View
          style={[
            baseStyle.row,
            baseStyle.justifyBetween,
            baseStyle.paddingTop,
          ]}>
          <Text style={{color: '#333333'}}>{item.companyName}</Text>
          <Text style={[baseStyle.textYellow]}>
            {statusObj[item.positionRecordstatus]}
          </Text>
        </View>
        {item.positionRecordstatus === 1 ? (
          item.resumeTemp ? (
            <View style={[baseStyle.row, {justifyContent: 'flex-end'}]}>
              <View style={sty.btn}>
                <Text style={baseStyle.textYellow}>下载简历模板</Text>
              </View>
              <View style={sty.btn}>
                <Text style={baseStyle.textYellow}>上传新简历</Text>
              </View>
            </View>
          ) : (
            <View style={[baseStyle.row, {justifyContent: 'flex-end'}]}>
              <View style={sty.btn}>
                <Text style={baseStyle.textYellow}>已邀面试</Text>
              </View>
            </View>
          )
        ) : null}
      </View>
    );
  }
}

export default Item;

const sty = StyleSheet.create({
  btn: {
    borderColor: '#D9B06F',
    borderWidth: 0.5,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 7,
    paddingRight: 7,
    marginLeft: 10,
  },
});
