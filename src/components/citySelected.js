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
    const {item, selected} = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.selectProvince(item);
          return false;
        }}
        style={[baseStyle.row, baseStyle.justifyBetween, sty.itemSty]}>
        <Text>{item.regionName}</Text>
        {selected ? <Icontick color="#D9B06F" /> : null}
      </TouchableOpacity>
    );
  }
}

class City extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {item, selected} = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.selectCity(item);
          return false;
        }}
        style={[baseStyle.row, baseStyle.justifyBetween, sty.itemSty]}>
        <Text>{item.regionName}</Text>
        {selected ? <Icontick color="#D9B06F" /> : null}
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
      regionList: [],
    };
  }
  selected(type, id) {
    return id === this.state.selected[type];
  }
  UNSAFE_componentWillMount() {
    this.setState({
      selected: this.props.selected,
    });
    global.httpGet('region/getregionlist', {pid: 1001000000}, res => {
      console.log('getregionlist', res);
      this.setState({
        provinceList: res.data,
      });
    });
  }

  getCityList(pid, key) {
    global.httpGet('region/getregionlist', {pid: pid}, res => {
      console.log(res);
      if (res.data.length > 0) {
        const obj = {};
        obj[key] = res.data;
        this.setState(obj);
      } else {
        this.props.selectedEvent(this.state.selected);
      }
    });
  }
  render() {
    const {provinceList, cityList, regionList} = this.state;
    if (provinceList.length === 0) {
      return false;
    }
    return (
      <TouchableOpacity
        style={[baseStyle.fullScreenMask]}
        onPress={() => {
          console.log('close');
          this.props.close();
        }}>
        <View style={[baseStyle.row, sty.scrollViewBox]}>
          <ScrollView style={[sty.scrollView, {left: 0}]}>
            {provinceList.map((item, idx) => {
              return (
                <Province
                  key={idx}
                  item={item}
                  selected={this.selected('provinceId', item.regionId)}
                  selectProvince={res => {
                    console.log('selectProvince', res);
                    const selected = this.state.selected;
                    selected.provinceId = item.regionId;
                    selected.provinceName = item.regionName;
                    this.setState({selected});
                    this.getCityList(res.regionId, 'cityList');
                  }}
                />
              );
            })}
          </ScrollView>
          <ScrollView
            style={[sty.scrollView, sty.cityBox, {backgroundColor: '#F7F7F7'}]}>
            {cityList.map((item, idx) => {
              return (
                <City
                  key={idx}
                  item={item}
                  selected={this.selected('cityId', item.regionId)}
                  // selected={this.selected('provinceId', item.regionId)}
                  selectCity={res => {
                    console.log('selectProvince', res);
                    const selected = this.state.selected;
                    selected.cityId = item.regionId;
                    selected.cityName = item.regionName;
                    selected.regionId = null;
                    selected.regionName = '';
                    this.setState({selected});
                    this.getCityList(res.regionId, 'regionList');
                  }}
                  // selectCity={res => {
                  //   const selected = this.state.selected;
                  //   selected.cityId = item.regionId;
                  //   selected.cityName = item.regionName;
                  //   this.setState({selected});
                  //   this.props.selectedEvent(selected);
                  // }}
                />
              );
            })}
          </ScrollView>
          <ScrollView style={[sty.scrollView, sty.cityBox]}>
            {regionList.map((item, idx) => {
              return (
                <City
                  key={idx}
                  item={item}
                  selected={this.selected('regionId', item.regionId)}
                  selectCity={res => {
                    const selected = this.state.selected;
                    selected.regionId = item.regionId;
                    selected.regionName = item.regionName;
                    this.setState({selected});
                    this.props.selectedEvent(selected);
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
    // maxHeight: (baseStyle.screenHeight / 5) * 4,
    height: 300,
    backgroundColor: '#fff',
    // position: 'absolute',
    // width: baseStyle.screenWidth / 3,
    flex: 1,
    bottom: 0,
    // padding: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    // borderTopRightRadius: 10,
    // borderTopLeftRadius: 10,
  },
  scrollViewBox: {
    height: 300,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  cityBox: {
    borderLeftColor: '#F6F6F6',
    borderLeftWidth: 0.5,
    flex: 1,
  },
  itemSty: {
    padding: 15,
    borderBottomColor: '#F1F0F0',
    borderBottomWidth: 0.5,
    flex: 1,
    // backgroundColor: '#F7F7F7',
  },
  label: {
    color: '#333333',
  },
});
