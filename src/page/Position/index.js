import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {setStatusBar} from '../../components/setStatusBar';
import Header from '../../components/Header';
import {baseStyle} from '../../components/baseStyle';
import Iconsearch from '../../iconfont/Iconsearch';
import IconjiantouDown from '../../iconfont/IconjiantouDown';
// import PositionItem from '../../components/PositionItem';
import PositionList from '../../components/PositionList';
import CitySelected from '../../components/CitySelected';
import {TopviewGetInstance} from 'beeshell';
@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class Position extends Component {
  constructor() {
    super();
    this.state = {
      params: {},
      cityPickId: null,
    };
  }
  openCityPick() {
    const {provinceId, cityId} = this.state.params;
    const selected = {
      provinceId: provinceId || '',
      cityId: cityId || '',
    };
    TopviewGetInstance()
      .add(
        <CitySelected
          selected={selected}
          close={() => {
            TopviewGetInstance().remove(this.state.cityPickId);
          }}
          selectedEvent={res => {
            const params = Object.assign(this.state.params, res);
            this.setState({
              params,
            });
            this.positionList.state.getPositionList(params);
            TopviewGetInstance().remove(this.state.cityPickId);
          }}
        />,
      )
      .then(id => {
        this.setState({
          cityPickId: id,
        });
      });
  }
  render() {
    return (
      <View style={[baseStyle.bgWhite, {height: baseStyle.screenHeight}]}>
        <Header isHeader={false} />
        <View style={baseStyle.content}>
          <View style={[baseStyle.row, sty.searchBox]}>
            <Iconsearch />
            <TextInput placeholder="搜索职位" style={baseStyle.paddingLeft} />
          </View>
        </View>
        <View style={[baseStyle.paddingTop, baseStyle.borderBottom]}>
          <View
            style={[
              baseStyle.row,
              baseStyle.justifyBetween,
              baseStyle.paddingLeft,
              baseStyle.paddingRight,
            ]}>
            <View style={[baseStyle.relation, baseStyle.paddingBottom]}>
              <Text>最新职位</Text>
              <View style={sty.yellowSolidBottom} />
            </View>
            <View style={baseStyle.row}>
              <TouchableOpacity
                onPress={() => {
                  this.openCityPick();
                }}
                style={baseStyle.row}>
                <Text style={{paddingRight: 5}}>城市</Text>
                <IconjiantouDown color="#B0ADAD" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('PositionFilter', {
                    callBack: res => {
                      this.positionList.state.getPositionList(res);
                    },
                  });
                }}
                style={[baseStyle.paddingLeft, baseStyle.row]}>
                <Text style={{paddingRight: 5}}>筛选</Text>
                <IconjiantouDown color="#B0ADAD" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView style={sty.scrollView}>
          <PositionList
            ref={position => {
              this.positionList = position;
            }}
            navigation={this.props.navigation}
          />
        </ScrollView>
      </View>
    );
  }
}

export default Position;
const sty = StyleSheet.create({
  scrollView: {
    backgroundColor: '#FBFBFB',
  },
  searchBox: {
    backgroundColor: '#F2F6FB',
    borderRadius: 20,
    paddingLeft: 15,
    paddingRight: 15,
    height: 40,
  },
  yellowSolidBottom: {
    width: 30,
    height: 2.5,
    backgroundColor: '#D9B06F',
    position: 'absolute',
    bottom: -0.5,
    left: 0,
  },
});
