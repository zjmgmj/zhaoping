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
  static defaultProps = {
    isRegion: true,
  };
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      provinceList: [],
      cityList: [],
      regionList: [],
      isTap: false,
    };
  }
  selected(type, id) {
    return id === this.state.selected[type];
  }
  UNSAFE_componentWillMount() {
    this.setState({
      selected: this.props.selected,
      isTap: false,
    });
    global.httpGet('region/getregionlist', {pid: 1001000000}, res => {
      console.log('getregionlist', res);
      const {provinceId} = this.props.selected;
      const resData = res.data;
      if (provinceId) {
        let idx = null;
        const findData = resData.find((item, index) => {
          idx = index;
          return item.regionId == provinceId;
        });
        debugger;
        console.log('findData', findData);
        if (findData) {
          delete resData[idx];
          resData.unshift(findData);
        }
      }
      this.setState({
        provinceList: resData,
      });
    });
    debugger;
    const {provinceId, cityId} = this.props.selected;
    if (provinceId) {
      this.getCityList(provinceId, 'cityList');
    }
    if (cityId) {
      this.getCityList(cityId, 'regionList');
    }
  }

  getCityList(pid, key) {
    const {provinceId, cityId, regionId} = this.props.selected;
    console.log(provinceId);
    console.log(cityId);
    console.log(regionId);
    global.httpGet('region/getregionlist', {pid: pid}, res => {
      if (res.data.length > 0) {
        const obj = {};
        obj[key] = res.data;
        if (cityId || regionId) {
          let idx = null;
          const {cityId, regionId} = this.props.selected;
          const id =
            key === 'cityList'
              ? cityId
              : key === 'regionList'
              ? regionId
              : null;
          const findData = obj[key].find((item, index) => {
            idx = index;
            return item.regionId == id;
          });
          console.log('findData', findData);
          if (findData) {
            delete obj[key][idx];
            obj[key].unshift(findData);
          }
        }
        this.setState(obj);
      } else if (this.state.isTap) {
        this.props.selectedEvent(this.state.selected);
      }
    });
  }
  render() {
    const {provinceList, cityList, regionList} = this.state;
    const {isRegion} = this.props;
    if (provinceList.length === 0) {
      return false;
    }
    return (
      <TouchableOpacity
        style={[baseStyle.fullScreenMask]}
        onPress={() => {
          this.setState({
            flog: 'close',
          });
          this.props.close();
        }}>
        <View style={[baseStyle.row, sty.scrollViewBox]}>
          <ScrollView style={[sty.scrollView, {left: 0}, sty.col]}>
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
                    this.setState({
                      selected,
                      isTap: true,
                      cityList: [],
                      regionList: [],
                    });
                    this.getCityList(res.regionId, 'cityList');
                  }}
                />
              );
            })}
          </ScrollView>
          <ScrollView style={[sty.scrollView, sty.cityBox]}>
            {cityList.map((item, idx) => {
              return (
                <City
                  key={idx}
                  item={item}
                  selected={this.selected('cityId', item.regionId)}
                  // selected={this.selected('provinceId', item.regionId)}
                  selectCity={res => {
                    debugger;
                    if (isRegion) {
                      const selected = this.state.selected;
                      selected.cityId = item.regionId;
                      selected.cityName = item.regionName;
                      selected.regionId = null;
                      selected.regionName = '';
                      this.setState({selected, isTap: true, regionList: []});
                      this.getCityList(res.regionId, 'regionList');
                    } else {
                      debugger;
                      const selected = this.state.selected;
                      selected.cityId = item.regionId;
                      selected.cityName = item.regionName;
                      // this.setState({selected});
                      this.setState({selected, isTap: true, flog: 'close'});
                      this.props.selectedEvent(selected);
                    }
                  }}
                />
              );
            })}
          </ScrollView>
          {isRegion ? (
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
                      this.setState({selected, flog: 'close'});
                      this.props.selectedEvent(selected);
                    }}
                  />
                );
              })}
            </ScrollView>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  }
}

const sty = StyleSheet.create({
  col: {
    flex: 1,
  },
  scrollView: {
    // maxHeight: (baseStyle.screenHeight / 5) * 4,
    height: 300,
    backgroundColor: '#fff',
    // position: 'absolute',
    width: baseStyle.screenWidth / 3,
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
