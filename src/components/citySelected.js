import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {baseStyle} from './baseStyle';
import Icontick from '../iconfont/Icontick';

class Province extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const item = this.props.item;
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.selectProvince(item);
          return false;
        }}
        style={[baseStyle.row, baseStyle.justifyBetween, sty.itemSty]}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }
}

class City extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const item = this.props.item;
    return (
      <TouchableOpacity
        onPress={() => {
          return false;
        }}
        style={[baseStyle.row, baseStyle.justifyBetween, sty.itemSty]}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }
}

export default class CitySelected extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      provinceList: [],
      cityList: [],
    };
  }
  selected(id) {
    return id === this.props.selected ? <Icontick color="#D9B06F" /> : null;
  }
  UNSAFE_componentWillMount() {
    global.httpGet('region/getregionlist', {pid: 1001000000}, res => {
      console.log(res);
      this.setState({
        provinceList: res.data,
      });
    });
  }

  getCityList(pid) {
    global.httpGet('region/getregionlist', {pid: pid}, res => {
      console.log(res);
      this.setState({
        cityList: res.data,
      });
    });
  }
  render() {
    return (
      <TouchableOpacity
        style={baseStyle.fullScreenMask}
        onPress={() => {
          console.log('close');
          this.props.close();
        }}>
        <View style={baseStyle.row}>
          <ScrollView style={sty.scrollView}>
            {this.state.provinceList.map((item, idx) => {
              return (
                <Province
                  key={idx}
                  item={item}
                  selectProvince={res => {
                    console.log('selectProvince', res);
                    this.getCityList(res.pid);
                  }}
                />
              );
            })}
          </ScrollView>
          <ScrollView style={sty.scrollView}>
            {this.state.cityList.map((item, idx) => {
              return (
                <City
                  key={idx}
                  item={item}
                  selectCity={res => {
                    console.log('selectCity', res);
                  }}
                />
              );
            })}
          </ScrollView>
        </View>
      </TouchableOpacity>
    );
  }
}

const sty = StyleSheet.create({
  scrollView: {
    maxHeight: (baseStyle.screenHeight / 5) * 4,
    backgroundColor: '#fff',
    position: 'absolute',
    width: baseStyle.screenWidth,
    bottom: 0,
    // padding: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  itemSty: {
    padding: 15,
    borderBottomColor: '#F1F0F0',
    borderBottomWidth: 0.5,
  },
  label: {
    color: '#333333',
  },
});
