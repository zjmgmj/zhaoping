import React, {Component} from 'react';
import {Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {baseStyle} from './baseStyle';
import Icontick from '../iconfont/Icontick';

export default class Picker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }
  selected(id) {
    return id === this.props.selected ? <Icontick color="#D9B06F" /> : null;
  }
  render() {
    const list = this.props.list;
    const valueKey = this.props.valueKey || 'id';
    const labelKey = this.props.labelKey || 'dvalue';
    return (
      <TouchableOpacity
        style={baseStyle.fullScreenMask}
        onPress={() => {
          console.log('close');
          this.props.close();
        }}>
        <ScrollView style={sty.scrollView}>
          {list.map((item, idx) => {
            return (
              <TouchableOpacity
                key={idx}
                onPress={() => {
                  this.props.selectedEvent(item);
                  // this.props.close();
                  return false;
                }}
                style={[baseStyle.row, baseStyle.justifyBetween, sty.itemSty]}>
                <Text
                  style={[
                    sty.label,
                    item[valueKey] === this.props.selected
                      ? baseStyle.textYellow
                      : null,
                  ]}>
                  {item[labelKey]}
                </Text>
                {this.selected(item[valueKey])}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
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
