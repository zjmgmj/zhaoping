import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Title,
} from 'react-native';
import Header from '../../components/Header';
import {setStatusBar} from '../../components/setStatusBar';
import {Button} from 'beeshell/dist/components/Button';
import {baseStyle} from '../../components/baseStyle';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      educationList: [
        '全部',
        '初中及以下',
        '中专/中技',
        '高中',
        '大专',
        '本科',
        '硕士',
        '博士',
      ],
    };
  }
  render() {
    return (
      <View style={{backgroundColor: '#fff', height: baseStyle.screenHeight}}>
        <Header
          title="职位筛选"
          fullScreen
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <ScrollView>
          <View style={baseStyle.content}>
            <Text style={[baseStyle.ft16, baseStyle.paddingLeft]}>
              学历要求
            </Text>
            <View style={[sty.flexRow]}>
              {this.state.educationList.map((item, index) => {
                return (
                  <View style={sty.filterItem} key={index}>
                    <Text style={sty.itemText}>{item}</Text>
                  </View>
                );
              })}
            </View>
          </View>
          <View style={baseStyle.content}>
            <Text style={[baseStyle.ft16, baseStyle.paddingLeft]}>
              薪资待遇
            </Text>
            <View style={[sty.flexRow]}>
              {this.state.educationList.map((item, index) => {
                return (
                  <View style={sty.filterItem} key={index}>
                    <Text style={sty.itemText}>{item}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Filter;

const sty = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignContent: 'center',
    flexWrap: 'wrap',
  },
  filterItem: {
    width: (baseStyle.screenWidth - 90) / 3,
    height: 30,
    borderColor: '#999999',
    borderRadius: 5,
    borderWidth: 0.5,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 15,
    marginRight: 10,
    marginLeft: 10,
  },
  itemText: {
    textAlign: 'center',
  },
  itemActive: {
    backgroundColor: '#D9B06F',
    color: '#fff',
  },
});
