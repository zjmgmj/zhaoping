import React, {Component} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {baseStyle} from './baseStyle';

const sty = StyleSheet.create({
  positionItem: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  positionTitle: {
    fontSize: 20,
  },
  positionImg: {
    width: 53,
    height: 64,
    resizeMode: 'contain',
  },
  positionTag: {
    marginRight: 10,
    // padding: 3,
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 3,
    paddingBottom: 3,
    backgroundColor: '#F1F3FC',
  },
});
class PositionList extends Component {
  render() {
    return (
      <View>
        <View
          style={[
            baseStyle.borderBottom,
            sty.positionItem,
            baseStyle.flex,
            baseStyle.justifyBetween,
          ]}>
          <View style={[baseStyle.row, {flex: 1}]}>
            <Image
              style={sty.positionImg}
              source={require('../images/position_1.png')}
            />
            <View style={{paddingLeft: 15}}>
              <Text style={baseStyle.positionTitle}>人力资源主管</Text>
              <Text style={[baseStyle.ft13, baseStyle.textGray]}>
                上海汇之余服饰有限公司
              </Text>
              <View
                style={[
                  baseStyle.row,
                  baseStyle.justifyBetween,
                  {marginTop: 3, width: baseStyle.screenWidth - 85},
                ]}>
                <View style={[baseStyle.row]}>
                  <View style={sty.positionTag}>
                    <Text style={sty.textGray}>上海宝山区</Text>
                  </View>
                  <View style={sty.positionTag}>
                    <Text style={sty.textGray}>1-3年</Text>
                  </View>
                  <View style={sty.positionTag}>
                    <Text style={sty.textGray}>本科</Text>
                  </View>
                </View>
                <Text style={[baseStyle.textGray, baseStyle.ft12]}>
                  HR 7天未查看
                </Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={[{color: '#AC3E40'}, baseStyle.fontBold]}>18-20K</Text>
          </View>
        </View>
        <View
          style={[
            baseStyle.borderBottom,
            sty.positionItem,
            baseStyle.flex,
            baseStyle.justifyBetween,
          ]}>
          <View style={[baseStyle.row, {flex: 1}]}>
            <Image
              style={sty.positionImg}
              source={require('../images/position_1.png')}
            />
            <View style={{paddingLeft: 15}}>
              <Text style={baseStyle.positionTitle}>人力资源主管</Text>
              <Text style={[baseStyle.ft13, baseStyle.textGray]}>
                上海汇之余服饰有限公司
              </Text>
              <View
                style={[
                  baseStyle.row,
                  baseStyle.justifyBetween,
                  {marginTop: 3, width: baseStyle.screenWidth - 85},
                ]}>
                <View style={[baseStyle.row]}>
                  <View style={sty.positionTag}>
                    <Text style={sty.textGray}>上海宝山区</Text>
                  </View>
                  <View style={sty.positionTag}>
                    <Text style={sty.textGray}>1-3年</Text>
                  </View>
                  <View style={sty.positionTag}>
                    <Text style={sty.textGray}>本科</Text>
                  </View>
                </View>
                <Text style={[baseStyle.textGray, baseStyle.ft12]}>
                  HR 7天未查看
                </Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={[{color: '#AC3E40'}, baseStyle.fontBold]}>18-20K</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default PositionList;
